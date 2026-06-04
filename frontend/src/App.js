import React from "react";
import { LanguageProvider, useLang } from "@/i18n/LanguageContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import LegalPage from "@/pages/LegalPage";

const RoutedApp = () => {
  const { lang } = useLang();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Polish legal routes */}
      <Route path="/regulamin" element={<LegalPage type="terms" forceLang="pl" />} />
      <Route path="/polityka-prywatnosci" element={<LegalPage type="privacy" forceLang="pl" />} />
      {/* English legal routes */}
      <Route path="/terms" element={<LegalPage type="terms" forceLang="en" />} />
      <Route path="/privacy-policy" element={<LegalPage type="privacy" forceLang="en" />} />
      {/* Generic redirects so users land on the right legal page in their language */}
      <Route
        path="/legal/terms"
        element={<Navigate to={lang === "pl" ? "/regulamin" : "/terms"} replace />}
      />
      <Route
        path="/legal/privacy"
        element={<Navigate to={lang === "pl" ? "/polityka-prywatnosci" : "/privacy-policy"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RoutedApp />
        <Toaster
          position="bottom-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "#131B2A",
              color: "#F4F0E6",
              border: "1px solid rgba(212,175,55,0.25)",
            },
          }}
        />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
