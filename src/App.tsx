import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { AppointmentBooking } from './components/AppointmentBooking';
import { VideoCall } from './components/VideoCall';
import { MedicalHistory } from './components/MedicalHistory';
import { HelpGuide } from './components/HelpGuide';

type Screen = 'landing' | 'onboarding' | 'dashboard' | 'booking' | 'videocall' | 'history' | 'help';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctor: 'Dra. Ana Martínez',
      doctorId: '1',
      specialty: 'Medicina General',
      specialtyId: 'general',
      date: '15 de Diciembre',
      time: '10:00 AM',
      status: 'confirmada',
      reason: 'Consulta de rutina'
    }
  ]);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);

  const handleRegister = (name: string, email: string) => {
    setUser({ name, email });
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setUser(null);
    setAppointments([]);
    setAppointmentToEdit(null);
    setCurrentScreen('landing');
  };

  const handleAppointmentComplete = (appointmentData: { specialty: string; specialtyId: string; doctor: string; doctorId: string; date: string; time: string; reason: string }) => {
    if (appointmentToEdit) {
      // Update existing appointment
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentToEdit.id 
          ? { 
              ...apt, 
              specialty: appointmentData.specialty,
              specialtyId: appointmentData.specialtyId,
              doctor: appointmentData.doctor,
              doctorId: appointmentData.doctorId,
              date: appointmentData.date,
              time: appointmentData.time,
              reason: appointmentData.reason
            }
          : apt
      ));
      setAppointmentToEdit(null);
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now(),
        specialty: appointmentData.specialty,
        specialtyId: appointmentData.specialtyId,
        doctor: appointmentData.doctor,
        doctorId: appointmentData.doctorId,
        date: appointmentData.date,
        time: appointmentData.time,
        status: 'confirmada',
        reason: appointmentData.reason
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    setCurrentScreen('dashboard');
  };

  const handleReschedule = (appointment: Appointment) => {
    setAppointmentToEdit(appointment);
    setCurrentScreen('booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'landing' && (
        <LandingPage onRegister={handleRegister} />
      )}
      
      {currentScreen === 'onboarding' && (
        <Onboarding 
          userName={user?.name || ''} 
          onComplete={handleOnboardingComplete} 
        />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard 
          userName={user?.name || ''} 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          appointments={appointments}
          onReschedule={handleReschedule}
        />
      )}
      
      {currentScreen === 'booking' && (
        <AppointmentBooking 
          onBack={() => {
            setAppointmentToEdit(null);
            navigateTo('dashboard');
          }}
          onComplete={handleAppointmentComplete}
          editingAppointment={appointmentToEdit}
        />
      )}
      
      {currentScreen === 'videocall' && (
        <VideoCall 
          onEnd={() => navigateTo('dashboard')}
        />
      )}
      
      {currentScreen === 'history' && (
        <MedicalHistory 
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentScreen === 'help' && (
        <HelpGuide 
          onBack={() => navigateTo('dashboard')}
        />
      )}
    </div>
  );
}