<script>
  import { onMount } from 'svelte';
  import connection from '../lib/connection';
  import { showPopup } from '../lib/showPopup';
  import { postTo } from '../lib/manageAuthRequest';

  let notifications = [];

  async function getNotifications() {
    try {
      let response = await connection.get('/notifications');
      if (response.status === 200) {
        notifications = await response.data;
        let ncount = document.querySelector('.ncount');
        if(notifications.length > 0) {
          let notificationList = document.querySelector('.notifications');
          ncount.innerHTML = notifications.length;
          notificationList.innerHTML = '<h2 class="font-bold text-dark text-lg mb-2">Notifiche</h2> <ul> <hr class="border-gray my-2"> </ul>';
          
          notifications.forEach(notification => {
            let li = document.createElement('li');
            li.innerHTML = `<p class="text-dark text-sm">${notification.message}</p> <p class="text-dark text-xs opacity-50">${notification.created_at.split('T')[0].replaceAll('-', '/')}</p> <hr class="border-gray my-2">`;
            notificationList.querySelector('ul').appendChild(li);
          });
          ncount.classList.remove('hidden');
        } else {
          ncount.innerHTML = '';
          ncount.classList.add('hidden');
        }
      }
    } catch (error) {
      // Do nothing
    }
  }

  async function markAsRead() {
    try {
      let response = await connection.post(`/notifications/read`);
      if (response.status === 200) {
        getNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      let response = await postTo('/logout');
      if (response.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      showPopup('E', 'Errore', 'Non è stato possibile effettuare il logout');
    }
  }

  onMount(async () => {
    getNotifications();

    setInterval(() => {
      getNotifications();
    }, 60000);
  });
  
</script>
  <header class="flex items-center justify-between w-full h-16 bg-light absolute top-0 left-0 border-b-2 border-gray p-8 z-20">
    <h1 class="font-display font-bold text-primary text-4xl">Citium</h1>
    <nav class="flex gap-2 relative">
      <div class="notifications hidden absolute top-8 right-8 w-80 bg-light border-2 border-gray rounded-lg p-4 z-20">
        <h2 class="font-bold text-dark text-lg mb-2">Notifiche</h2>
        <ul>
          <hr class="border-gray my-2">
        </ul>
      </div>
      <button class="icon p-2 relative" on:click={() => {
        try {
          markAsRead();
          let notificationList = document.querySelector('.notifications');
          notificationList.classList.toggle('hidden');
        } catch (error) {
          showPopup('E', 'Errore', 'Non è stato possibile segnare le notifiche come lette');
        }
      }}>
        <span class="ncount absolute top-2 right-2 -mt-2 -mr-2 bg-primary text-light text-xs rounded-full w-4 h-4 flex items-center justify-center hidden"></span>
        <img src="/icons/notification.svg" alt="🔔">
      </button>
      <div class="useractions hidden absolute top-8 right-0 w-80 bg-light border-2 border-gray rounded-lg p-4 z-20">
        <h2 class="font-bold text-dark text-lg mb-2">Account</h2>
        <ul>
          <hr class="border-gray my-2">
          <li>
            <button class="text-primary text-sm" on:click={logout}>Esci</button>
          </li>
        </ul>
      </div>
      <button class="icon p-2" on:click={() => {
        let useractions = document.querySelector('.useractions');
        useractions.classList.toggle('hidden');
      }}>
        <img src="/icons/account.svg" alt="👤">
      </button>
    </nav>
  </header>
  <main class="h-screen">
    <slot></slot>
  </main>