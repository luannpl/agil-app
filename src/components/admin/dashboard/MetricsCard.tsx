import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  gradient?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  gradient = "from-gray-500 to-gray-600",
  iconColor = "text-gray-600",
  trend,
  className,
}: MetricsCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 py-2",
        className
      )}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2.5 rounded-xl shadow-sm">
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2.5} />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="text-3xl sm:text-4xl font-bold tracking-tight">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs mês anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
