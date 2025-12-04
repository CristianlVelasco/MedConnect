import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Appointment {
  id: number;
  doctor: string;
  doctorId: string;
  specialty: string;
  specialtyId: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

interface AppointmentBookingProps {
  onBack: () => void;
  onComplete: (appointmentData: { specialty: string; specialtyId: string; doctor: string; doctorId: string; date: string; time: string; reason: string }) => void;
  editingAppointment?: Appointment | null;
}

export function AppointmentBooking({ onBack, onComplete, editingAppointment }: AppointmentBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState(editingAppointment?.specialtyId || '');
  const [selectedDoctor, setSelectedDoctor] = useState(editingAppointment?.doctorId || '');
  const [selectedDate, setSelectedDate] = useState(editingAppointment?.date || '');
  const [selectedTime, setSelectedTime] = useState(editingAppointment?.time || '');
  const [reason, setReason] = useState(editingAppointment?.reason || '');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({ reason: '' });

  const specialties = [
    { id: 'general', name: 'Medicina General', description: 'Consultas y chequeos generales' },
    { id: 'pediatria', name: 'Pediatría', description: 'Atención médica para niños' },
    { id: 'dermatologia', name: 'Dermatología', description: 'Problemas de piel y cabello' },
    { id: 'psicologia', name: 'Psicología', description: 'Apoyo emocional y mental' }
  ];

  const doctors = [
    { id: '1', name: 'Dra. Ana Martínez', specialty: 'general', rating: '4.8' },
    { id: '2', name: 'Dr. Carlos Ruiz', specialty: 'general', rating: '4.9' },
    { id: '3', name: 'Dra. Laura Pérez', specialty: 'pediatria', rating: '5.0' },
    { id: '4', name: 'Dr. Miguel Torres', specialty: 'dermatologia', rating: '4.7' },
    { id: '5', name: 'Dra. Sofia Romero', specialty: 'psicologia', rating: '4.9' }
  ];

  const availableDates = [
    '15 de Diciembre',
    '16 de Diciembre',
    '17 de Diciembre',
    '18 de Diciembre',
    '19 de Diciembre',
    '20 de Diciembre'
  ];

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ];

  const filteredDoctors = doctors.filter(d => d.specialty === selectedSpecialty);

  const handleConfirm = () => {
    if (!reason.trim()) {
      setErrors({ reason: 'Por favor, explica brevemente el motivo de tu consulta' });
      return;
    }

    const selectedSpecialtyData = specialties.find(s => s.id === selectedSpecialty);
    const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);

    if (!selectedSpecialtyData || !selectedDoctorData) return;

    onComplete({
      specialty: selectedSpecialtyData.name,
      specialtyId: selectedSpecialty,
      doctor: selectedDoctorData.name,
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason: reason
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">
            {editingAppointment ? 'Cita reagendada con éxito' : 'Cita agendada con éxito'}
          </h2>
          <p className="text-gray-600 mb-6">
            Te hemos enviado un correo con los detalles de tu cita. También recibirás un recordatorio antes de la consulta.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 mb-1">
              {selectedDate} a las {selectedTime}
            </p>
            <p className="text-blue-700 text-sm">
              {doctors.find(d => d.id === selectedDoctor)?.name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            {editingAppointment ? 'Reagendar cita' : 'Agendar nueva cita'}
          </h1>
          <p className="text-gray-600">
            {editingAppointment ? 'Modifica los detalles de tu cita' : 'Sigue los pasos para reservar tu consulta médica'}
          </p>
        </div>

        {editingAppointment && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm">
              Estás modificando tu cita con {editingAppointment.doctor}
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    num <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      num < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Especialidad</span>
            <span>Doctor</span>
            <span>Fecha y hora</span>
            <span>Confirmar</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Step 1: Select Specialty */}
          {step === 1 && (
            <div>
              <h2 className="text-gray-900 mb-4">
                ¿Qué tipo de consulta necesitas?
              </h2>
              <p className="text-gray-600 mb-6">
                Selecciona la especialidad médica que necesitas
              </p>
              <div className="space-y-3">
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedSpecialty === specialty.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-gray-900 mb-1">
                      {specialty.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {specialty.description}
                    </p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => selectedSpecialty && setStep(2)}
                disabled={!selectedSpecialty}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Select Doctor */}
          {step === 2 && (
            <div>
              <h2 className="text-gray-900 mb-4">
                Elige tu doctor
              </h2>
              <p className="text-gray-600 mb-6">
                Todos nuestros doctores están certificados y tienen experiencia
              </p>
              <div className="space-y-3">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedDoctor === doctor.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 mb-1">
                          {doctor.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Calificación: {doctor.rating} / 5.0
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => selectedDoctor && setStep(3)}
                  disabled={!selectedDoctor}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Date and Time */}
          {step === 3 && (
            <div>
              <h2 className="text-gray-900 mb-4">
                ¿Cuándo quieres tu cita?
              </h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">
                  Selecciona el día
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        selectedDate === date
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <p className="text-gray-900 text-sm">{date}</p>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-3">
                    Selecciona la hora
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border-2 rounded-lg transition-colors ${
                          selectedTime === time
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                        <p className="text-gray-900 text-sm">{time}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={() => selectedDate && selectedTime && setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-gray-900 mb-4">
                Confirma tu cita
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Doctor</p>
                    <p className="text-gray-900">
                      {doctors.find(d => d.id === selectedDoctor)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Fecha y hora</p>
                    <p className="text-gray-900">
                      {selectedDate} a las {selectedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Especialidad</p>
                    <p className="text-gray-900">
                      {specialties.find(s => s.id === selectedSpecialty)?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="reason" className="block text-gray-700 mb-2">
                  Motivo de la consulta
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setErrors({ reason: '' });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.reason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={4}
                  placeholder="Ejemplo: Tengo dolor de cabeza desde hace 3 días"
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? 'reason-error' : undefined}
                />
                {errors.reason && (
                  <p id="reason-error" className="mt-2 text-red-600 text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errors.reason}</span>
                  </p>
                )}
                <p className="mt-2 text-gray-500 text-sm">
                  Esto ayudará al doctor a prepararse para tu consulta
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900 text-sm">
                  Recibirás un correo de confirmación y un recordatorio antes de tu cita
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAppointment ? 'Confirmar cambios' : 'Confirmar cita'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}