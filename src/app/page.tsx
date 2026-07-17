import DesktopLayout from "@/components/layout/DesktopLayout";

/**
 * Pagina raiz (Home).
 * Em Next.js 13+ App Router, paginas do server-side por padrao sao Server Components.
 * Mapeamos a lógica interativa para o client-component DesktopLayout para manter a pagina limpa.
 */
export default function Home() {
  return <DesktopLayout />;
}
