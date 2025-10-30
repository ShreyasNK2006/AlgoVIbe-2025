'use client';

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  NodeProps,
  EdgeProps,
  getBezierPath,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { House } from '@/lib/types';
import { motion } from 'framer-motion';
import { Home, MapPin } from 'lucide-react';
import ParticleTrail from './particle-trail';

interface MapVisualizationProps {
  houses: House[];
  route: number[];
  currentPosition: number;
  isPlaying: boolean;
}

// Custom House Node Component
function HouseNode({ data }: NodeProps) {
  const isActive = data.isActive;
  const isVisited = data.isVisited;
  const isCurrent = data.isCurrent;
  
  return (
    <motion.div
      className={`
        relative px-4 py-3 rounded-xl border-2 min-w-[180px]
        ${isCurrent ? 'border-indigo-500 bg-indigo-500/20 shadow-glow' : ''}
        ${isVisited && !isCurrent ? 'border-purple-500/50 bg-purple-500/10' : ''}
        ${!isVisited && !isCurrent ? 'border-slate-700 bg-slate-900' : ''}
        transition-all duration-300
      `}
      animate={isCurrent ? { scale: 1.1 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ParticleTrail isActive={isCurrent} color="#6366f1" count={15} />
      <div className="flex items-start gap-3">
        <motion.div 
          className={`
            p-2 rounded-lg
            ${isCurrent ? 'bg-indigo-500' : 'bg-slate-800'}
          `}
          animate={isCurrent ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Home className="w-5 h-5 text-slate-50" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-sm font-semibold text-slate-50 truncate">
            {data.house.name}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Priority: {data.house.preference}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {data.house.timeWindow.start}:00 - {data.house.timeWindow.end}:00
          </p>
        </div>
      </div>
      {isCurrent && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <MapPin className="w-6 h-6 text-indigo-400 animate-bounce" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Custom Route Edge Component
function RouteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isActive = data?.isActive || false;
  const isTraveled = data?.isTraveled || false;

  return (
    <>
      <path
        id={id}
        style={style}
        className={`
          ${isTraveled ? 'stroke-purple-500' : 'stroke-slate-700'}
          ${isActive ? 'stroke-indigo-500' : ''}
          transition-all duration-500
        `}
        strokeWidth={isActive ? 4 : isTraveled ? 3 : 2}
        fill="none"
        d={edgePath}
      />
      {isActive && (
        <motion.circle
          r="6"
          fill="#6366f1"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#${id}`} />
          </animateMotion>
        </motion.circle>
      )}
    </>
  );
}

const nodeTypes = {
  house: HouseNode,
};

const edgeTypes = {
  route: RouteEdge,
};

export default function MapVisualization({
  houses,
  route,
  currentPosition,
  isPlaying,
}: MapVisualizationProps) {
  
  // Generate nodes from houses
  const nodes: Node[] = useMemo(() => {
    return houses.map((house, index) => {
      const visitedIndex = route.indexOf(index);
      const isVisited = visitedIndex !== -1 && visitedIndex < currentPosition;
      const isCurrent = route[currentPosition] === index;
      
      return {
        id: `house-${index}`,
        type: 'house',
        position: { x: house.coordinates.x, y: house.coordinates.y },
        data: {
          house,
          isActive: isCurrent || isVisited,
          isVisited,
          isCurrent,
        },
      };
    });
  }, [houses, route, currentPosition]);

  // Generate edges from route
  const edges: Edge[] = useMemo(() => {
    if (route.length < 2) return [];
    
    return route.slice(0, -1).map((fromIdx, i) => {
      const toIdx = route[i + 1];
      const isTraveled = i < currentPosition - 1;
      const isActive = i === currentPosition - 1;
      
      return {
        id: `route-${i}`,
        source: `house-${fromIdx}`,
        target: `house-${toIdx}`,
        type: 'route',
        animated: isActive,
        data: {
          isActive,
          isTraveled,
        },
      };
    });
  }, [route, currentPosition]);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#1e1e2e" gap={16} />
        <Controls className="bg-slate-900 border-slate-700" />
        <MiniMap
          className="bg-slate-900 border border-slate-700"
          nodeColor={(node) => {
            if (node.data?.isCurrent) return '#6366f1';
            if (node.data?.isVisited) return '#8b5cf6';
            return '#27272a';
          }}
        />
      </ReactFlow>
    </div>
  );
}
