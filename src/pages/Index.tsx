import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import CategorySection from "@/components/CategorySection";
import LeaderboardSection from "@/components/LeaderboardSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const openRegistration = () => {
    if (user) {
      navigate('/quiz');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={openRegistration} />
      <main>
        <WelcomeCard onGetStarted={openRegistration} />
        <CategorySection />
        <LeaderboardSection />
        <FeaturesSection />
      </main>
      <Footer />
      
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
    </div>
  );
};

export default Index;
