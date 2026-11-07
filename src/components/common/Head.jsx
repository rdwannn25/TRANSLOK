// src/components/Head.jsx
import React from 'react';

export default function Head({ 
  title, 
  description, 
  keywords, 
  image, 
  url 
}) {
  // --- DEFAULT VALUES UNTUK TRANSLOK ---
  const defaultTitle = "TRANSLOK | Sistem Informasi Angkutan Umum Bandung Raya";
  const defaultDescription = "Pantau rute, jadwal kedatangan, dan titik transit terintegrasi untuk armada Angkot Feeder dan Bus BRT di Cekungan Bandung Raya dengan mudah dan akurat.";
  const defaultKeywords = "translok, angkutan umum bandung, rute angkot bandung, bus brt bandung raya, jadwal bus bandung, transportasi publik";
  const defaultImage = `${import.meta.env.APP}/Poster2.png`; // Ganti dengan URL domain asli saat production
  const defaultUrl = `${import.meta.env.APP}`;

  // --- ASSIGN VALUES ---
  const metaTitle = title ? `${title} | TRANSLOK` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url || defaultUrl;

  // Di React 19, tag <title>, <meta>, dan <link> ini akan otomatis di-hoist ke <head> dokumen
  return (
    <>
      {/* Standard SEO Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Translok Cekungan Bandung Raya" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={metaUrl} />
      <link rel="icon" type="image/svg+xml" href={metaImage} />

      {/* Mobile & PWA Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="theme-color" content="#1AAA4A" /> {/* Warna hijau utama */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="TRANSLOK Bandung" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </>
  );
}