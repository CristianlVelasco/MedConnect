import { useState } from 'react';
import { ArrowLeft, Calendar, Video, FileText, Settings, MessageCircle, Clock, CheckCircle, Phone, Upload, ChevronDown, ChevronRight } from 'lucide-react';

interface HelpGuideProps {
  onBack: () => void;
}

export function HelpGuide({ onBack }: HelpGuideProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Primeros pasos',
      icon: CheckCircle,
      topics: [
        {
          title: '¿Cómo crear una cuenta?',
          content: [
            '1. Haz clic en el botón "Crear cuenta" en la página principal',
            '2. Escribe tu nombre completo (por ejemplo: María García)',
            '3. Escribe tu correo electrónico (ejemplo@correo.com)',
            '4. Haz clic en "Continuar"',
            '5. Sigue el tutorial de bienvenida para conocer la plataforma'
          ]
        },
        {
          title: 'Tutorial de bienvenida',
          content: [
            'Cuando creas tu cuenta, verás un tutorial con 3 pasos que te explican:',
            '• Cómo agendar citas',
            '• Cómo usar las videollamadas',
            '• Dónde encontrar tu historial médico',
            'Puedes saltar el tutorial si lo deseas, haciendo clic en "Saltar tutorial"'
          ]
        },
        {
          title: '¿Cómo cerrar sesión?',
          content: [
            'En la parte superior derecha de la pantalla verás tu nombre',
            'Al lado hay un ícono de salida con el texto "Cerrar sesión"',
            'Haz clic ahí para salir de tu cuenta de forma segura'
          ]
        }
      ]
    },
    {
      id: 'appointments',
      title: 'Agendar citas',
      icon: Calendar,
      topics: [
        {
          title: '¿Cómo agendar una cita nueva?',
          content: [
            'Paso 1: En el inicio, haz clic en "Agendar nueva cita"',
            'Paso 2: Elige la especialidad médica que necesitas (Medicina General, Pediatría, etc.)',
            'Paso 3: Selecciona el doctor que prefieras. Puedes ver su calificación',
            'Paso 4: Elige el día y la hora que mejor te convenga',
            'Paso 5: Escribe el motivo de tu consulta (ayuda al doctor a prepararse)',
            'Paso 6: Revisa todos los datos y haz clic en "Confirmar cita"',
            'Recibirás un correo con la confirmación'
          ]
        },
        {
          title: '¿Cómo reagendar una cita?',
          content: [
            '1. Ve a la sección "Tus próximas citas" en el inicio',
            '2. Busca la cita que quieres cambiar',
            '3. Haz clic en el botón "Reagendar"',
            '4. Sigue los mismos pasos que para agendar (cambiar doctor, fecha u hora)',
            '5. Confirma los cambios',
            'Tu cita anterior será reemplazada por la nueva'
          ]
        },
        {
          title: '¿Qué especialidades están disponibles?',
          content: [
            '• Medicina General: Consultas y chequeos generales',
            '• Pediatría: Atención médica para niños',
            '• Dermatología: Problemas de piel y cabello',
            '• Psicología: Apoyo emocional y mental',
            'Cada especialidad tiene doctores certificados disponibles'
          ]
        },
        {
          title: '¿Cuándo recibo la confirmación?',
          content: [
            'Cuando confirmas una cita, inmediatamente:',
            '• Verás un mensaje de confirmación en pantalla',
            '• Recibirás un correo electrónico con los detalles',
            '• La cita aparecerá en tu sección "Tus próximas citas"',
            'También recibirás un recordatorio antes de la cita'
          ]
        }
      ]
    },
    {
      id: 'videocall',
      title: 'Videollamadas',
      icon: Video,
      topics: [
        {
          title: '¿Cómo unirme a mi videollamada?',
          content: [
            'Opción 1: Desde tu cita programada',
            '• Ve a "Tus próximas citas"',
            '• Haz clic en "Unirse a la llamada"',
            '',
            'Opción 2: Desde el menú principal',
            '• Haz clic en "Iniciar videollamada"',
            '',
            'La plataforma te conectará automáticamente con tu doctor'
          ]
        },
        {
          title: 'Controles durante la videollamada',
          content: [
            'Verás 5 botones principales:',
            '',
            '🎤 Micrófono: Apagar o encender tu micrófono',
            '📹 Cámara: Apagar o encender tu cámara',
            '📞 Teléfono rojo: Terminar la llamada',
            '💬 Chat: Enviar mensajes de texto al doctor',
            '📤 Subir: Compartir documentos o imágenes',
            '',
            'Cada botón muestra su función cuando pasas el cursor sobre él'
          ]
        },
        {
          title: '¿Qué hago si no tengo cámara?',
          content: [
            'No te preocupes, puedes:',
            '• Hacer la consulta solo con audio (micrófono)',
            '• Usar el chat de texto para comunicarte',
            '• El doctor podrá verte representado con tus iniciales',
            '',
            'La consulta es igual de efectiva sin cámara'
          ]
        },
        {
          title: '¿Cómo compartir documentos?',
          content: [
            '1. Durante la videollamada, haz clic en el botón "Subir" (ícono de flecha hacia arriba)',
            '2. Se abrirá un panel lateral',
            '3. Haz clic en el área para seleccionar archivos',
            '4. Elige el documento (PDF, JPG o PNG)',
            '5. Haz clic en "Subir archivo"',
            '6. El doctor recibirá el documento inmediatamente',
            '',
            'Puedes compartir: análisis, radiografías, recetas anteriores'
          ]
        },
        {
          title: 'Problemas técnicos comunes',
          content: [
            '❌ No se escucha el audio:',
            '• Verifica que tu micrófono esté encendido (botón no debe estar rojo)',
            '• Revisa que tu navegador tenga permiso para usar el micrófono',
            '',
            '❌ No se ve el video:',
            '• Verifica que tu cámara esté encendida',
            '• Revisa los permisos de la cámara en tu navegador',
            '',
            '❌ La llamada se corta:',
            '• Verifica tu conexión a internet',
            '• Intenta cerrar otras aplicaciones'
          ]
        }
      ]
    },
    {
      id: 'history',
      title: 'Mi historial médico',
      icon: FileText,
      topics: [
        {
          title: '¿Cómo ver mis consultas anteriores?',
          content: [
            '1. Haz clic en "Ver mi historial" desde el inicio',
            '2. Verás dos pestañas: "Mis consultas" y "Mis recetas"',
            '3. En "Mis consultas" encontrarás todas tus citas pasadas',
            '4. Cada consulta muestra:',
            '   • Nombre del doctor y especialidad',
            '   • Fecha y duración',
            '   • Diagnóstico',
            '   • Notas del doctor',
            '5. Puedes descargar el resumen haciendo clic en "Descargar"'
          ]
        },
        {
          title: '¿Dónde están mis recetas?',
          content: [
            '1. Ve a "Ver mi historial"',
            '2. Haz clic en la pestaña "Mis recetas"',
            '3. Verás todas las recetas que te han dado los doctores',
            '4. Cada receta incluye:',
            '   • Nombre del medicamento',
            '   • Dosis recomendada',
            '   • Duración del tratamiento',
            '   • Fecha y doctor que la prescribió',
            '5. Puedes descargar cada receta en PDF'
          ]
        },
        {
          title: '¿Puedo buscar en mi historial?',
          content: [
            'Sí, usa la barra de búsqueda en la parte superior',
            'Puedes buscar por:',
            '• Nombre del doctor',
            '• Fecha de la consulta',
            '• Diagnóstico',
            '• Tipo de medicamento',
            '',
            'Escribe lo que buscas y los resultados se filtrarán automáticamente'
          ]
        },
        {
          title: '¿Mi historial es privado?',
          content: [
            '✓ Tu historial médico es completamente privado',
            '✓ Solo tú y tus doctores pueden verlo',
            '✓ Está protegido con cifrado de seguridad',
            '✓ Nadie más tiene acceso a tu información',
            '✓ Cumplimos con todas las leyes de privacidad médica',
            '',
            'Tu información está segura con nosotros'
          ]
        }
      ]
    },
    {
      id: 'technical',
      title: 'Requisitos técnicos',
      icon: Settings,
      topics: [
        {
          title: '¿Qué necesito para usar MedConnect?',
          content: [
            'Dispositivos compatibles:',
            '• Computadora (Windows o Mac)',
            '• Tablet (iPad o Android)',
            '• Celular (iPhone o Android)',
            '',
            'Navegadores compatibles:',
            '• Chrome (recomendado)',
            '• Firefox',
            '• Safari',
            '• Edge',
            '',
            'Conexión a internet:',
            '• Conexión estable (WiFi o datos móviles)',
            '• Velocidad mínima: 2 Mbps'
          ]
        },
        {
          title: 'Permisos necesarios',
          content: [
            'Para las videollamadas necesitarás dar permiso a:',
            '',
            '📷 Cámara (opcional):',
            '• Para que el doctor pueda verte',
            '• Puedes hacer consultas sin cámara',
            '',
            '🎤 Micrófono (necesario):',
            '• Para comunicarte con el doctor',
            '• Sin micrófono, usa el chat de texto',
            '',
            'El navegador te pedirá estos permisos automáticamente'
          ]
        },
        {
          title: 'Preparación antes de la consulta',
          content: [
            'Antes de tu videollamada:',
            '✓ Prueba tu cámara y micrófono',
            '✓ Busca un lugar tranquilo y con buena luz',
            '✓ Cierra otras aplicaciones para mejor conexión',
            '✓ Ten a mano tus documentos médicos si los necesitas',
            '✓ Prepara tus preguntas o síntomas a comentar',
            '✓ Conéctate 5 minutos antes de tu cita'
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Preguntas frecuentes',
      icon: MessageCircle,
      topics: [
        {
          title: '¿Cuánto cuesta usar MedConnect?',
          content: [
            'Crear tu cuenta es completamente gratis',
            'El costo varía según el tipo de consulta',
            'Verás el precio antes de confirmar tu cita',
            'Aceptamos diferentes métodos de pago',
            'No hay cargos ocultos ni sorpresas'
          ]
        },
        {
          title: '¿Los doctores están certificados?',
          content: [
            'Sí, todos nuestros doctores:',
            '✓ Están certificados y titulados',
            '✓ Tienen años de experiencia',
            '✓ Son evaluados regularmente',
            '✓ Cumplen con todas las normas médicas',
            '',
            'Puedes ver la calificación de cada doctor antes de agendar'
          ]
        },
        {
          title: '¿Puedo cancelar una cita?',
          content: [
            'Sí, puedes:',
            '• Reagendar tu cita (cambiar fecha u hora)',
            '• Contactar a soporte para cancelar',
            '',
            'Te recomendamos hacerlo con al menos 24 horas de anticipación',
            'Así otros pacientes pueden usar ese horario'
          ]
        },
        {
          title: '¿Qué pasa si llego tarde?',
          content: [
            'Si llegas tarde a tu videollamada:',
            '• Tienes un margen de 10 minutos',
            '• Después de eso, la cita puede ser cancelada',
            '• Te recomendamos conectarte 5 minutos antes',
            '',
            'Consejo: Activa las notificaciones de recordatorio'
          ]
        },
        {
          title: '¿Puedo tener citas con el mismo doctor?',
          content: [
            'Sí, puedes:',
            '• Ver el historial de tus doctores anteriores',
            '• Elegir el mismo doctor al agendar',
            '• El doctor verá tu historial completo',
            '',
            'Esto ayuda a dar mejor seguimiento a tu tratamiento'
          ]
        },
        {
          title: '¿Necesito ayuda adicional?',
          content: [
            'Si tienes más dudas o problemas:',
            '',
            '📧 Correo: ayuda@medconnect.com',
            '📞 Teléfono: 1-800-MEDCONNECT',
            '⏰ Horario: Lunes a Viernes, 8am - 8pm',
            '',
            'Nuestro equipo de soporte está aquí para ayudarte'
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Guía de ayuda
          </h1>
          <p className="text-gray-600">
            Manual completo para usar MedConnect. Encuentra respuestas a todas tus dudas.
          </p>
        </div>

        {/* Welcome box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-blue-900 mb-3">
            Bienvenido al centro de ayuda
          </h2>
          <p className="text-blue-800 mb-4">
            Esta guía está diseñada para ser fácil de entender. Hemos organizado todo por temas para que encuentres lo que necesitas rápidamente.
          </p>
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <Clock className="w-4 h-4" />
            <span>Tiempo estimado de lectura: 15 minutos</span>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 text-left">
                      {section.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {section.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="border-t border-gray-100 pt-4 first:border-0 first:pt-0"
                        >
                          <h4 className="text-gray-900 mb-3">
                            {topic.title}
                          </h4>
                          <div className="space-y-2">
                            {topic.content.map((line, lineIndex) => (
                              <p
                                key={lineIndex}
                                className={`text-gray-600 text-sm ${
                                  line === '' ? 'h-2' : ''
                                } ${
                                  line.startsWith('•') || 
                                  line.startsWith('✓') || 
                                  line.startsWith('❌') || 
                                  line.match(/^\d+\./)
                                    ? 'ml-4'
                                    : ''
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact support */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">
                ¿Todavía tienes dudas?
              </h3>
              <p className="text-gray-700 mb-4">
                Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  📧 Correo: <span className="text-blue-600">ayuda@medconnect.com</span>
                </p>
                <p className="text-gray-700">
                  📞 Teléfono: <span className="text-blue-600">1-800-MEDCONNECT</span>
                </p>
                <p className="text-gray-700">
                  ⏰ Horario: Lunes a Viernes, 8:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tips */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-green-900 mb-4">
            Consejos rápidos para aprovechar MedConnect
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-green-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Conecta 5 minutos antes de tu cita para verificar audio y video</span>
            </p>
            <p className="text-green-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Guarda tus recetas en un lugar seguro y descárgalas si las necesitas</span>
            </p>
            <p className="text-green-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Activa las notificaciones para no olvidar tus citas</span>
            </p>
            <p className="text-green-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Prepara tus documentos médicos antes de la videollamada</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
