import { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Upload, AlertCircle } from 'lucide-react';

interface VideoCallProps {
  onEnd: () => void;
}

export function VideoCall({ onEnd }: VideoCallProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isConnecting]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUpload(false);
    }, 2000);
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-white mb-2">
            Conectando con el doctor...
          </h2>
          <p className="text-gray-400">
            Esto puede tomar unos segundos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main video (Doctor) */}
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-4xl">AM</span>
            </div>
            <p className="text-white mb-1">Dra. Ana Martínez</p>
            <p className="text-gray-400 text-sm">Medicina General</p>
          </div>
        </div>

        {/* Self video preview */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
          {isVideoOn ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-600">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">Tú</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <VideoOff className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Call info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg px-4 py-2">
          <p className="text-white text-sm">Duración: {formatDuration(callDuration)}</p>
        </div>

        {/* Connection status */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-green-600 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm">Conectado</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Microphone toggle */}
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isMicOn
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              title={isMicOn ? 'Apagar micrófono' : 'Encender micrófono'}
            >
              {isMicOn ? (
                <Mic className="w-6 h-6 text-white" />
              ) : (
                <MicOff className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Video toggle */}
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isVideoOn
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              title={isVideoOn ? 'Apagar cámara' : 'Encender cámara'}
            >
              {isVideoOn ? (
                <Video className="w-6 h-6 text-white" />
              ) : (
                <VideoOff className="w-6 h-6 text-white" />
              )}
            </button>

            {/* End call */}
            <button
              onClick={onEnd}
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
              title="Finalizar llamada"
            >
              <Phone className="w-6 h-6 text-white transform rotate-135" />
            </button>

            {/* Chat toggle */}
            <button
              onClick={() => {
                setShowChat(!showChat);
                setShowUpload(false);
              }}
              className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
              title="Abrir chat"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </button>

            {/* Upload documents */}
            <button
              onClick={() => {
                setShowUpload(!showUpload);
                setShowChat(false);
              }}
              className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
              title="Subir documentos"
            >
              <Upload className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Status messages */}
          <div className="mt-4 text-center">
            {!isMicOn && (
              <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Tu micrófono está apagado
              </p>
            )}
            {!isVideoOn && (
              <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Tu cámara está apagada
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chat panel */}
      {showChat && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg flex flex-col">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3>Chat de la consulta</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-900 text-sm mb-1">Dra. Ana Martínez</p>
                <p className="text-gray-700 text-sm">
                  Hola, ¿cómo te sientes hoy?
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setChatMessage('')}
                disabled={!chatMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload panel */}
      {showUpload && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-lg flex flex-col">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3>Subir documentos</h3>
            <button
              onClick={() => setShowUpload(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4">
            {uploadSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-green-900 mb-1">
                  Archivo subido correctamente
                </p>
                <p className="text-green-700 text-sm">
                  El doctor puede verlo ahora
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">
                  Comparte estudios médicos, análisis o recetas con el doctor
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-700 mb-1">
                    Haz clic para seleccionar
                  </p>
                  <p className="text-gray-500 text-sm">
                    o arrastra archivos aquí
                  </p>
                </div>

                <button
                  onClick={handleFileUpload}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subir archivo
                </button>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    Formatos aceptados: PDF, JPG, PNG
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
