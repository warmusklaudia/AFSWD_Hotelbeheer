<template>
  <ul
    class="font-title grid w-full grid-cols-5 items-center text-center text-[11px] font-bold sm:w-auto sm:space-x-3 sm:text-left sm:text-sm md:gap-3"
  >
    <li>
      <router-link
        class="ring-themeBrown inline-block rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/"
        exact-active-class="opacity-60"
      >
        <Home class="mx-auto mb-2 h-5 sm:hidden" />
        <p>{{ $t('navigation.home') }}</p>
      </router-link>
    </li>
    <li>
      <router-link
        class="ring-themeBrown inline-block rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/rooms"
        active-class="opacity-60"
      >
        <Bed class="mx-auto mb-2 h-5 sm:hidden" />
        <p>{{ $t('navigation.rooms') }}</p>
      </router-link>
    </li>
    <li>
      <router-link
        class="ring-themeBrown inline-block rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/services"
        active-class="opacity-60"
      >
        <ConciergeBell class="mx-auto mb-2 h-5 sm:hidden" />
        <p>{{ $t('navigation.services') }}</p>
      </router-link>
    </li>
    <li>
      <router-link
        class="ring-themeBrown inline-block rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/reservations"
        active-class="opacity-60"
      >
        <Clipboard class="mx-auto mb-2 h-5 sm:hidden" />
        <p>{{ $t('navigation.reservations') }}</p>
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 sm:hidden"
        to="/profile"
        active-class="opacity-60"
      >
        <Scroll class="mx-auto mb-2 h-5" />
        <p>{{ $t('navigation.user') }}</p>
      </router-link>
    </li>
    <li>
      <div v-if="user" class="font-title flex flex-col items-center">
        <img
          v-if="customUser?.imgUrl !== ''"
          class="h-10 w-10 rounded-full object-cover md:h-14 md:w-14"
          :src="customUser?.imgUrl"
          :alt="`Picture of ${customUser?.firstName} ${customUser?.lastName}`"
        />
        <img
          v-else
          class="h-10 w-10 rounded-full object-cover md:h-14 md:w-14"
          src="../../assets/default_profile.jpg"
          :alt="`Picture of ${customUser?.firstName} ${customUser?.lastName}`"
        />

        <label for="pic-upload">
          <div
            class="bg-themeBrown -mt-3 hidden cursor-pointer items-center justify-center rounded-full hover:opacity-90 md:flex md:h-4 md:w-4"
          >
            <p class="text-sm text-white md:text-xl"><Plus size="14" /></p>
            <input
              class="hidden"
              @change="uploadPic"
              id="pic-upload"
              type="file"
              accept="image/*"
            />
          </div>
        </label>
      </div>
    </li>
    <li class="hidden sm:block">
      <router-link
        v-if="user"
        class="ring-themeBrown rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/profile"
      >
        {{ user.displayName }}
      </router-link>
      <router-link
        v-else
        class="ring-themeBrown rounded-sm py-6 outline-none focus-visible:ring-2"
        to="/auth/login"
        >Login
      </router-link>
    </li>
    <li class="hidden sm:block">
      <ul class="flex items-center">
        <li v-if="user" class="px-3">
          $
          {{
            customUser?.amountCredits == null
              ? 20.0
              : customUser?.amountCredits.toFixed(2)
          }}
        </li>
        <li class="px-3">
          <select
            name=""
            id=""
            class="ring-themeBrown cursor-pointer rounded-sm bg-transparent py-6 outline-none focus-visible:ring-2"
            @change="setLocale"
          >
            <option
              v-for="locale of AVAILABLE_LOCALES"
              :value="locale"
              :selected="locale === i18n.global.locale"
            >
              {{ locale }}
            </option>
          </select>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  Home,
  Bed,
  Clipboard,
  Scroll,
  ConciergeBell,
  Plus,
} from 'lucide-vue-next'

import useI18n from '../../composables/useI18n'
import useAuthentication from '../../composables/useAuthentication'
import useCustomUser from '../../composables/useCustomUser'
import usePicture from '../../composables/usePicture'
const { user } = useAuthentication()
const { customUser } = useCustomUser()
const { loadLocale, AVAILABLE_LOCALES, i18n } = useI18n()
const { uploadPic } = usePicture()

const setLocale = (event: Event) => {
  const target = event?.target as HTMLSelectElement
  loadLocale(target.value)
}
</script>
