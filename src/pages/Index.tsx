import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import CategorySection from "@/components/CategorySection";
import LeaderboardSection from "@/components/LeaderboardSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import { useState } from "react";

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openRegistration = () => setIsRegistrationOpen(true);

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
