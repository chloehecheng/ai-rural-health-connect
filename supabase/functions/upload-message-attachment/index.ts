
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const messageId = formData.get('messageId')

    if (!file || !messageId) {
      throw new Error('Missing file or message ID')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileName = file.name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = fileName.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('message_attachments')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { error: dbError } = await supabase
      .from('message_attachments')
      .insert({
        message_id: messageId,
        file_name: fileName,
        file_type: file.type,
        file_size: file.size,
        file_path: filePath,
      })

    if (dbError) throw dbError

    // Create notification for new message with attachment
    const { error: notificationError } = await supabase
      .from('message_notifications')
      .insert({
        message_id: messageId,
        type: 'read',
        recipient_id: (await supabase.from('messages').select('user_id').eq('id', messageId).single()).data?.user_id,
      })

    if (notificationError) throw notificationError

    return new Response(
      JSON.stringify({ success: true, filePath }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
