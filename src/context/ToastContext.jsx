import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none no-print">
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let styleClasses = "bg-emerald-900/90 text-white border-emerald-700";

          if (toast.type === "warning") {
            Icon = AlertTriangle;
            styleClasses = "bg-amber-900/90 text-white border-amber-700";
          } else if (toast.type === "error") {
            Icon = XCircle;
            styleClasses = "bg-rose-900/90 text-white border-rose-700";
          } else if (toast.type === "info") {
            Icon = Info;
            styleClasses = "bg-slate-900/90 text-white border-slate-700";
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${styleClasses}`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 shrink-0 text-emerald-400" />
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-300 hover:text-white ml-3 p-1 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
