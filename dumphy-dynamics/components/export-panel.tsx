'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileJson, FileText, Check } from 'lucide-react';
import { House } from '@/lib/types';

interface ExportPanelProps {
  route: number[];
  houses: House[];
  totalDistance: number;
  timeElapsed: number;
}

export default function ExportPanel({ route, houses, totalDistance, timeElapsed }: ExportPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateJSON = () => {
    const data = {
      route: route.map(idx => ({
        index: idx,
        house: houses[idx],
      })),
      statistics: {
        totalDistance,
        timeElapsed,
        numberOfStops: route.length,
        efficiency: route.length > 0 ? (totalDistance / route.length).toFixed(2) : 0,
      },
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const generateCSV = () => {
    const headers = ['Stop Number', 'House Name', 'Owner', 'Priority', 'Time Window Start', 'Time Window End', 'Coordinates'];
    const rows = route.map((idx, stopNum) => {
      const house = houses[idx];
      return [
        stopNum + 1,
        house.name,
        house.name.split(' - ')[0],
        house.preference,
        house.timeWindow.start,
        house.timeWindow.end,
        `"${house.x}, ${house.y}"`,
      ].join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const content = generateJSON();
    downloadFile(content, `tsp-route-${Date.now()}.json`, 'application/json');
    showCopiedFeedback();
  };

  const handleExportCSV = () => {
    const content = generateCSV();
    downloadFile(content, `tsp-route-${Date.now()}.csv`, 'text/csv');
    showCopiedFeedback();
  };

  const handleCopyJSON = async () => {
    const content = generateJSON();
    await navigator.clipboard.writeText(content);
    showCopiedFeedback();
  };

  const showCopiedFeedback = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 glass-card p-4 min-w-[280px] space-y-3"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3 className="text-sm font-semibold text-slate-50 mb-2">Export Route</h3>
            
            {/* JSON Export */}
            <div className="space-y-2">
              <motion.button
                onClick={handleExportJSON}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-500/50 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileJson className="w-5 h-5 text-indigo-400" />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-50">Download JSON</div>
                  <div className="text-xs text-slate-500">Complete route data</div>
                </div>
              </motion.button>

              <motion.button
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5 text-purple-400" />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-50">Download CSV</div>
                  <div className="text-xs text-slate-500">Spreadsheet format</div>
                </div>
              </motion.button>

              <motion.button
                onClick={handleCopyJSON}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 hover:border-green-500/50 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Download className="w-5 h-5 text-green-400" />
                )}
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-50">
                    {copied ? 'Copied!' : 'Copy JSON'}
                  </div>
                  <div className="text-xs text-slate-500">To clipboard</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card p-3 rounded-lg hover:bg-slate-800 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-5 h-5 text-slate-50 group-hover:text-indigo-400 transition-colors" />
      </motion.button>
    </div>
  );
}
