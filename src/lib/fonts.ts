import { Geist, Geist_Mono } from 'next/font/google';

/**
 * Configuración unificada de fuentes para toda la aplicación
 * Basada en la página principal para asegurar consistencia
 */

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * Clase CSS unificada para aplicar en body/contenedor
 * Asegura consistencia entre página principal y blog
 */
export const fontClassName = `${geistSans.variable} ${geistMono.variable} antialiased`;

/**
 * Variables CSS individuales para casos específicos
 */
export const fontVariables = {
  sans: geistSans.variable,
  mono: geistMono.variable,
};