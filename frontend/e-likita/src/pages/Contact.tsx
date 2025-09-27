import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">We’d love to hear from you. Fill out the form below:</p>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-xl" required />
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" required />
        <textarea placeholder="Message" rows={4} className="w-full p-3 border rounded-xl" required></textarea>
        <Button className="w-full bg-blue-600 text-white py-3 rounded-xl">Send Message</Button>
      </form>
    </div>
  );
}