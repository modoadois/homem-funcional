
import { Medal } from './types';

export const INITIAL_MEDALS: Medal[] = [
  { icon: 'rocket_launch', label: 'Inércia Zero', color: '#13ec5b', requirement: { type: 'tasks', value: 1 } },
  { icon: 'ac_unit', label: 'Racha-Gelo', color: '#60a5fa', requirement: { type: 'streak', value: 2 } },
  { icon: 'shield', label: 'Foco de Aço', color: '#fbbf24', requirement: { type: 'tasks', value: 5 } },
  { icon: 'electric_bolt', label: 'Impulso', color: '#a78bfa', requirement: { type: 'streak', value: 5 } },
  { icon: 'speed', label: 'Velocidade', color: '#fb7185', requirement: { type: 'tasks', value: 15 } },
  { icon: 'auto_awesome', label: 'Alquimista', color: '#00f2ff', requirement: { type: 'streak', value: 7 } },
  { icon: 'wb_sunny', label: 'Madrugador', color: '#f59e0b', requirement: { type: 'tasks', value: 30 } },
  { icon: 'diamond', label: 'Indestrutível', color: '#f472b6', requirement: { type: 'streak', value: 15 } },
  { icon: 'landscape', label: 'Pioneiro', color: '#2dd4bf', requirement: { type: 'tasks', value: 50 } },
];

export const TIMER_DURATION = 300; // 5 minutes (300 seconds) - The ideal "5-minute rule" duration.
