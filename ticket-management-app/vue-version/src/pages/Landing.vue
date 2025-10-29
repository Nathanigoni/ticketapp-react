<template>
  <Layout>
    <div class="relative overflow-hidden">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-20 pb-32">
        <!-- Decorative Circles -->
        <CircleDecoration 
          size="xlarge" 
          color="blue" 
          class="absolute top-10 left-10 opacity-20" 
        />
        <CircleDecoration 
          size="large" 
          color="blue" 
          class="absolute bottom-20 right-20 opacity-30" 
        />
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-6">
              Streamline Your
              <span class="block text-blue-200">Ticket Management</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Efficiently manage support tickets, track progress, and deliver exceptional customer service with our intuitive platform.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link
                to="/auth/signup"
                class="inline-flex items-center px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get Started Free
              </router-link>
              <router-link
                to="/auth/login"
                class="inline-flex items-center px-8 py-3 text-lg font-semibold border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Login
              </router-link>
            </div>
          </div>
        </div>
        
        <WaveBackground />
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage support tickets efficiently and effectively.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy Ticket Creation</h3>
              <p class="text-gray-600">
                Create and manage tickets with ease. Simple forms and intuitive interfaces make ticket management a breeze.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
              <p class="text-gray-600">
                Stay informed with real-time status updates and notifications for all your ticket activities.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-200">
              <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p class="text-gray-600">
                Gain insights with comprehensive dashboards and reporting tools to track your team's performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CircleDecoration 
            size="large" 
            color="gray" 
            class="absolute right-20 opacity-20" 
          />
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who use TicketFlow to streamline their support processes.
          </p>
          <router-link
            to="/auth/signup"
            class="inline-flex items-center px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Free Trial
          </router-link>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/Layout/Layout.vue'
import WaveBackground from '../components/Decorative/WaveBackground.vue'
import CircleDecoration from '../components/Decorative/CircleDecoration.vue'

export default {
  name: 'Landing',
  components: {
    Layout,
    WaveBackground,
    CircleDecoration
  }
}
</script>