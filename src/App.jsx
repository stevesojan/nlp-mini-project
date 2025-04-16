import { ToastContainer } from 'react-toastify';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import TextToSpeech from './Components/TextToSpeech/TextToSpeech';
import SpeechToText from './Components/SpeechToText/SpeechToText';
import ErrorBoundary from './Components/ErrorBoundry/ErrorBoundry';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <ErrorBoundary>
            <TextToSpeech />
          </ErrorBoundary>

          <ErrorBoundary>
            <SpeechToText />
          </ErrorBoundary>
        </div>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="font-medium"
        progressClassName="bg-[#E74C3C]"
      />
    </div>
  );
}

export default App;