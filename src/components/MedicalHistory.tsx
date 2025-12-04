import { useState } from 'react';
import { ArrowLeft, Calendar, Download, FileText, User, Search } from 'lucide-react';

interface MedicalHistoryProps {
  onBack: () => void;
}

export function MedicalHistory({ onBack }: MedicalHistoryProps) {
  const [selectedTab, setSelectedTab] = useState<'consultas' | 'recetas'>('consultas');
  const [searchTerm, setSearchTerm] = useState('');

  const consultations = [
    {
      id: 1,
      date: '28 de Noviembre, 2024',
      doctor: 'Dra. Ana Martínez',
      specialty: 'Medicina General',
      diagnosis: 'Resfriado común',
      notes: 'Paciente presenta síntomas leves de gripe. Se recomienda reposo e hidratación.',
      duration: '25 minutos'
    },
    {
      id: 2,
      date: '15 de Octubre, 2024',
      doctor: 'Dr. Carlos Ruiz',
      specialty: 'Medicina General',
      diagnosis: 'Control de rutina',
      notes: 'Chequeo general. Paciente en buen estado de salud.',
      duration: '20 minutos'
    },
    {
      id: 3,
      date: '3 de Septiembre, 2024',
      doctor: 'Dra. Laura Pérez',
      specialty: 'Dermatología',
      diagnosis: 'Dermatitis leve',
      notes: 'Se prescribe crema tópica. Mejoría esperada en 2 semanas.',
      duration: '30 minutos'
    }
  ];

  const prescriptions = [
    {
      id: 1,
      date: '28 de Noviembre, 2024',
      doctor: 'Dra. Ana Martínez',
      medications: [
        { name: 'Paracetamol 500mg', dosage: 'Tomar 1 tableta cada 8 horas', duration: '5 días' }
      ]
    },
    {
      id: 2,
      date: '3 de Septiembre, 2024',
      doctor: 'Dra. Laura Pérez',
      medications: [
        { name: 'Crema hidratante', dosage: 'Aplicar 2 veces al día', duration: '2 semanas' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Mi historial médico
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver todas tus consultas anteriores y recetas
          </p>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-900 text-sm">
            Tu historial médico es privado y solo tú y tus doctores pueden verlo. Puedes descargar cualquier documento cuando lo necesites.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por doctor, fecha o diagnóstico..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('consultas')}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  selectedTab === 'consultas'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mis consultas
              </button>
              <button
                onClick={() => setSelectedTab('recetas')}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  selectedTab === 'recetas'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mis recetas
              </button>
            </div>
          </div>

          {/* Consultations Tab */}
          {selectedTab === 'consultas' && (
            <div className="p-6">
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-gray-900 mb-1">
                            {consultation.doctor}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {consultation.specialty}
                          </p>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{consultation.date}</span>
                            <span className="text-gray-400">•</span>
                            <span>{consultation.duration}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        title="Descargar resumen"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-3">
                        <p className="text-gray-700 text-sm mb-1">
                          Diagnóstico
                        </p>
                        <p className="text-gray-900">
                          {consultation.diagnosis}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm mb-1">
                          Notas del doctor
                        </p>
                        <p className="text-gray-600 text-sm">
                          {consultation.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {consultations.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Aún no tienes consultas registradas
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Prescriptions Tab */}
          {selectedTab === 'recetas' && (
            <div className="p-6">
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-600 text-sm">{prescription.date}</span>
                        </div>
                        <h3 className="text-gray-900 mb-1">
                          Receta médica
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Prescrita por {prescription.doctor}
                        </p>
                      </div>
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                        title="Descargar receta"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-gray-900 mb-2">
                            {med.name}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="text-gray-700">Dosis:</span> {med.dosage}
                            </p>
                            <p className="text-gray-600">
                              <span className="text-gray-700">Duración:</span> {med.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">
                        Sigue las indicaciones de tu doctor. Si tienes dudas, contáctalo.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {prescriptions.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Aún no tienes recetas registradas
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-900 mb-2">
            ¿Necesitas ayuda para entender tu historial?
          </h3>
          <p className="text-green-800 text-sm mb-3">
            Si tienes dudas sobre tus diagnósticos o tratamientos, agenda una nueva consulta con tu doctor.
          </p>
          <button className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm">
            Hablar con un doctor
          </button>
        </div>
      </main>
    </div>
  );
}
