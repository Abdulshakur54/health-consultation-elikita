import { Button } from "@/components/ui/button";
import doctor from '@/assets/doctor_illustration2.png'

export default function Home() {
    return (
        <div>
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    {/* Text Content */}
                    <div className="text-center md:text-left space-y-6">
                        <header>
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 animate-fade-in">
                                Welcome to <span className="text-blue-500">e-Likita</span> <br />
                                Hospital Consultation Assistant
                            </h1>
                        </header>
                        <p className="text-gray-700 text-lg animate-slide-up max-w-lg mx-auto md:mx-0">
                            This guided consultation will help assess your symptoms and provide
                            appropriate healthcare recommendations.
                        </p>
                        <Button className="bg-blue-600 text-white px-6 py-7 rounded-lg shadow-md hover:bg-blue-700 transition animate-bounce-in">
                            Start Consultation
                        </Button>
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-center md:justify-end animate-fade-in">
                        <img
                            src={doctor}
                            alt="Doctor Illustration"
                            className="w-80 md:w-[400px] h-auto drop-shadow-lg"
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-row gap-5 rounded-xl">
                {/* Warning Section */}
                <section className="bg-red-50 text-red-700 px-6 text-center animate-bounce-in flex-1 flex flex-col justify-center items-center">
                     <h3 className="font-semibold">⚠️ Important</h3>
                    <p>
                        This tool is for guidance only and does not replace professional medical advice.
                        In case of emergency, call emergency services immediately.
                    </p>
                </section>

                {/* Steps Section */}
                <section className="bg-white px-6 text-center flex-2 py-5">
                    <header>
                        <h2 className="text-xl font-semibold text-blue-700 mb-8 animate-fade-in">
                            What to Expect
                        </h2>
                    </header>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-gray-700 text-left animate-slide-up pb-3">
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">1</span>
                            5-step guided consultation process
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">2</span>
                            Symptom assessment and risk evaluation
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">3</span>
                            Personalized healthcare recommendations
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">4</span>
                            Printable summary for your records
                        </li>
                    </ul>

                </section>
            </section>
        </div>
    );
}