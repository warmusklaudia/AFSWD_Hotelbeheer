<template>
    <section class="h-full">
        <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl mb-6">Choose a payment method</h2>
        <ul>
            <li class="flex items-center space-x-3">
                <label
                    class="flex h-5 w-5 items-center justify-center rounded-full border border-themeBrown ring-themeBrown focus-within:ring focus:outline-none">
                    <input class="peer sr-only" type="radio" name="paymentOptions" id="cash" checked/>
                    <span
                        class="transition w-2 h-2 bg-themeBrown rounded-full scale-0 ease-out peer-checked:scale-100"></span>
                </label>

                <label class="select-none dark:text-white" for="cash">
                    Cash payment
                </label>
            </li>
            <li class="flex items-center space-x-3 mt-3">
                <label
                    class="flex h-5 w-5 items-center justify-center rounded-full border border-themeBrown ring-themeBrown focus-within:ring focus:outline-none">
                    <input class="peer sr-only" type="radio" name="paymentOptions" id="credit"/>
                    <span
                        class="w-2 h-2 bg-themeBrown rounded-full transition scale-0 ease-out peer-checked:scale-100"></span>
                </label>

                <label class="select-none dark:text-white" for="credit">
                    Credit payment
                </label>
            </li>
        </ul>
        <div class="flex justify-end gap-3">
            <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
                @click="changeStepTo(2)">Previous</button>
            <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
                @click="changeStepTo(4)">Submit</button>
        </div>
    </section>
</template>
<script setup lang="ts">import useFormUpdate from "../../../composables/useFormUpdate";

const { changeStepTo } = useFormUpdate()
</script>