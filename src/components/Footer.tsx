export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div>
          {/* Brand */}
          <div>
            <p className="text-2xl font-semibold text-white">Looma</p>
            <p
              className="mt-4 max-w-xs text-sm text-text-tertiary"
              style={{ lineHeight: 1.7 }}
            >
              O marketplace que conecta profissionais digitais. Encontre,
              colabore e cresca.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-tertiary">
            &copy; 2026 Looma. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
