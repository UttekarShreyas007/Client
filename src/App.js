import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PropertiesPage from "./pages/PropertiesPage";
import ClientDashboard from "./pages/ClientDashboard";
import PropertyForm from "./pages/PropertyForm";
import AgentDashboard from "./pages/AgentDashboard";
import AgentProperties from "./pages/AgentProperties";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import "./styles/main.scss";
import Footer from "./components/Footer";
import ClientInterestPage from "./pages/ClientInterestPage";
import ClientsList from "./pages/ClientList";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<SignInPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/properties" element={<PropertiesPage />} />
          <Route
            exact
            path="/propertiesDetails/:id"
            element={<PropertyDetailsPage />}
          />
          <Route exact path="/clientDashboard" element={<ClientDashboard />} />
          <Route exact path="/agentDashboard" element={<AgentDashboard />} />
          <Route exact path="/add-property" element={<PropertyForm />} />
          <Route exact path="/my-properties" element={<AgentProperties />} />
          <Route exact path="/edit-property/:id" element={<PropertyForm />} />
          <Route
            exact
            path="/interested-properties"
            element={<ClientInterestPage />}
          />
          <Route exact path="/client-list" element={<ClientsList />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
