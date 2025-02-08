<script>
</script>
  <header class="flex items-center justify-between w-full h-16 bg-light absolute top-0 left-0 border-b-2 border-gray p-8 z-20">
    <h1 class="font-display font-bold text-primary text-4xl">Citium</h1>
    <nav class="flex gap-2">
      <button class="icon p-2">
        <img src="/icons/notification.svg" alt="">
      </button>
      <button class="icon p-2">
        <img src="/icons/account.svg" alt="">
      </button>
    </nav>
  </header>
  <main class="h-screen">
    <slot></slot>
  </main>