export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-text-secondary">
          O conteúdo que você procura não está disponível.
        </p>
      </div>
    </main>
  );
}
