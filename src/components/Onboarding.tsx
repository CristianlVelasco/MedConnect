import { useState } from 'react';
import { Video, Calendar, FileText, ChevronRight, Check } from 'lucide-react';

interface OnboardingProps {
  userName: string;
  onComplete: () => void;
}

export function Onboarding({ userName, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Calendar,
      title: 'Agenda tus citas fácilmente',
      description: 'Selecciona el día y hora que prefieras. Puedes cambiar o cancelar tu cita cuando lo necesites.',
      tip: 'Te enviaremos un recordatorio antes de cada cita'
    },
    {
      icon: Video,
      title: 'Consultas por videollamada',
      description: 'Habla cara a cara con tu doctor desde donde estés. Solo necesitas internet y una cámara.',
      tip: 'Puedes usar tu celular, tablet o computadora'
    },
    {
      icon: FileText,
      title: 'Tu historial siempre disponible',
      description: 'Todas tus consultas y recetas se guardan aquí. Puedes verlas cuando quieras.',
      tip: 'Tu información está protegida y es privada'
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">
                Paso {currentStep + 1} de {steps.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                Saltar tutorial
              </button>
            </div>
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Welcome message on first step */}
          {currentStep === 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900">
                Hola {userName}, bienvenido a MedConnect
              </p>
            </div>
          )}

          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-blue-600" />
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {currentStepData.description}
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-flex items-start gap-3 text-left">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800 text-sm">
                {currentStepData.tip}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>{currentStep < steps.length - 1 ? 'Siguiente' : 'Empezar a usar MedConnect'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
