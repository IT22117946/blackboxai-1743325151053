import { ReactNode } from 'react';

// Common types
type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type Placement = 'top' | 'right' | 'bottom' | 'left';

// Button
interface ButtonProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

// Input
interface InputProps {
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
}

// Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

// DataGrid
interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataGridProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  pageSize?: number;
  sortable?: boolean;
  selectable?: boolean;
  className?: string;
}

// Calendar
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  className?: string;
}

// Export all types
export type {
  ButtonProps,
  InputProps,
  ModalProps,
  DataGridProps,
  CalendarProps,
  ColumnDefinition,
  CalendarEvent,
  Size,
  Variant,
  Placement
};