import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;  // Added className as an optional prop
}

export const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};