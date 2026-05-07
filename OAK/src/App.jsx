import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ItemDetail from './pages/ItemDetail';
import ReservationConfirmed from './pages/ReservationConfirmed';
import Events from './pages/Events';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <PageLayout>
              <Menu />
            </PageLayout>
          }
        />
        <Route
          path="/item"
          element={
            <PageLayout>
              <ItemDetail />
            </PageLayout>
          }
        />
        <Route
          path="/reservation"
          element={
            <PageLayout>
              <ReservationConfirmed />
            </PageLayout>
          }
        />
        <Route
          path="/events"
          element={
            <PageLayout>
              <Events />
            </PageLayout>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
