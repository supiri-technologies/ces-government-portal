import React from 'react';

// Card Components
export const Card = ({ children, className = "", noShadow = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { noShadow?: boolean }) => (
  <div className={`bg-white rounded-lg ${noShadow ? '' : 'shadow-sm hover:shadow-md'} transition-shadow duration-200 border-none ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pb-2 ${className}`} {...props}>{children}</div>
);

export const CardTitle = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`} {...props}>{children}</h3>
);

export const CardContent = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-2 ${className}`} {...props}>{children}</div>
);

export const CardFooter = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 flex items-center ${className}`} {...props}>{children}</div>
);

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[#00a898] text-white hover:bg-[#008f81]",
      outline: "border border-[#00a898] text-[#00a898] bg-transparent hover:bg-[#f0f9f1]",
      ghost: "text-gray-600 hover:text-[#00a898] hover:bg-[#f0f9f1]",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Input Component
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a898] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// LineInput Component (Underlined with Icon)
export const LineInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ElementType }>(
  ({ className = "", icon: Icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {Icon && <Icon className="absolute left-0 text-gray-400 pointer-events-none" size={18} />}
        <input
          className={`flex h-10 w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00a898] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${Icon ? 'pl-8' : ''} ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
LineInput.displayName = "LineInput";

// Checkbox Component
export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border-gray-300 text-[#00a898] focus:ring-[#00a898] cursor-pointer ${className}`}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

// Select Component
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { icon?: React.ElementType }>(
    ({ className = "", children, icon: Icon, ...props }, ref) => {
      return (
        <div className="relative flex items-center w-full">
             {Icon && <Icon className="absolute left-0 text-gray-400 pointer-events-none" size={18} />}
            <select
                className={`flex h-10 w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00a898] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${Icon ? 'pl-8' : ''} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        </div>
      );
    }
);
Select.displayName = "Select";

// Label Component
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = "", ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

// Badge Component
export const Badge = ({ children, className = "", variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variant === 'outline' ? 'border border-gray-200 text-gray-900' : 'bg-[#d2f2d4] text-[#00a898]'} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Separator
export const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`h-[1px] w-full bg-gray-200 ${className}`} />
);