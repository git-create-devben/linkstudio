import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedWrapper from "@/components/animated-wrapper";

const mockLinks = [
  {
    id: 1,
    destination: "https://twitter.com/yourprofile",
    short: "link.st/ben",
    clicks: 124,
    created: "2025-08-01",
  },
  {
    id: 2,
    destination: "https://youtube.com/@yourchannel",
    short: "link.st/yt",
    clicks: 56,
    created: "2025-07-28",
  },
];

const ShortLinksPage = () => {
  const hasLinks = mockLinks.length > 0;
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-2 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-md">
      <AnimatedWrapper elementType="section" className="w-full max-w-4xl mx-auto text-center mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-left">Short Links</h1>
          <Button size="lg" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 w-full md:w-auto">
            + Create New Short Link
          </Button>
        </div>
        <Card className="p-0 overflow-x-auto shadow-sm border-0 bg-white/80 backdrop-blur-xl">
          {hasLinks ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Short URL</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockLinks.map(link => (
                  <tr key={link.id} className="hover:bg-blue-50/40 transition">
                    <td className="px-6 py-4 text-left max-w-xs truncate text-gray-800 text-base">{link.destination}</td>
                    <td className="px-6 py-4 text-left font-mono text-blue-600">{link.short}</td>
                    <td className="px-6 py-4 text-center text-gray-700 font-semibold">{link.clicks}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{link.created}</td>
                    <td className="px-6 py-4 text-center">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="text-5xl mb-4">🔗</span>
              <p className="text-lg text-gray-600 mb-4">No short links yet.</p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                + Create New Short Link
              </Button>
            </div>
          )}
        </Card>
      </AnimatedWrapper>
    </div>
  );
};

export default ShortLinksPage;