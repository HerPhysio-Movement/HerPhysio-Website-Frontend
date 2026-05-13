import { Calendar, FileText, Heart, BookOpen, TrendingUp, ArrowUpRight } from 'lucide-react';

const DashboardStats = ({ eventsCount, projectsCount, volunteersCount, articlesCount, coursesCount = 0, onStatClick }) => {
  const stats = [
    { label: 'Events', value: eventsCount, icon: Calendar, color: 'bg-pink-100 text-pink-600', bgGradient: 'from-pink-50 to-pink-100/30', filter: 'Events', trend: '+12%' },
    { label: 'Projects', value: projectsCount, icon: FileText, color: 'bg-blue-100 text-blue-600', bgGradient: 'from-blue-50 to-blue-100/30', filter: 'Projects', trend: '+8%' },
    { label: 'Volunteers', value: volunteersCount, icon: Heart, color: 'bg-green-100 text-green-600', bgGradient: 'from-green-50 to-green-100/30', filter: 'Volunteers', trend: '+24%' },
    { label: 'Articles', value: articlesCount, icon: BookOpen, color: 'bg-purple-100 text-purple-600', bgGradient: 'from-purple-50 to-purple-100/30', filter: 'Articles', trend: '+5%' },
    { label: 'Courses', value: coursesCount, icon: BookOpen, color: 'bg-amber-100 text-amber-600', bgGradient: 'from-amber-50 to-amber-100/30', filter: 'Courses', trend: '+3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1D2130]">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Track your platform metrics and performance</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <TrendingUp className="w-4 h-4 text-[#FD90A7]" />
          <span className="font-medium">Last 30 days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              onClick={() => onStatClick(stat.filter)}
              className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-[#FD90A7]/20 transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-[#1D2130] mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-[#FD90A7]/5 to-transparent rounded-xl border border-[#FD90A7]/20 p-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FD90A7]" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-[#1D2130]">{eventsCount + projectsCount + articlesCount + volunteersCount + coursesCount}</span> total resources
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FD90A7]" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-[#1D2130]">{volunteersCount}</span> active volunteers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FD90A7]" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-[#1D2130]">{coursesCount}</span> published courses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;