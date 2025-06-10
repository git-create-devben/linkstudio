import { Eye, Link, Percent, UserPlus } from "lucide-react";
import { Button } from "../ui/button";

const stats = [
  { icon: Eye, label: "Views", value: 0 },
  { icon: Link, label: "Clicks", value: 0 },
  { icon: Percent, label: "Click rate", value: "0%" },
  { icon: UserPlus, label: "Subscribers", value: 0 },
];

export default function StatsCard() {
  return (
    <div className="bg-white text-black rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4 md:gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold">Lifetime</h2>
          <span className="text-muted-foreground text-sm cursor-pointer">?</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-none rounded-4xl border-blue-600 border-1 hover:border-blue-700 text-blue-600 cursor-pointer text-xs md:text-sm font-medium px-4 md:px-7 py-2 md:py-2.5 transition-colors">
            Create
          </Button>
          <Button className="flex-1 sm:flex-none rounded-4xl bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs md:text-sm font-medium px-4 md:px-7 py-2 md:py-2.5 transition-colors">
            Manage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl">
            <div className="bg-muted p-2 rounded-lg md:rounded-xl shrink-0">
              <Icon className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
