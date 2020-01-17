<template>
  <v-row class="mb-6">
    <v-col>
      <div class="dashboard-widget">
        <div class="card-stats">
          <div class="raww">
            <div class="cel animated zoomIn delay-0.5s">
              <h5 class="widget-title">Users</h5>
              <span class="widget-title-text">350,897</span>
            </div>
            <div class="cel-auto">
              <div class="icon-shape purple animated zoomIn delay-0.5s">
                <v-icon color="white">mdi-account-multiple</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col>
      <div class="dashboard-widget">
        <div class="card-stats">
          <div class="raww">
            <div class="cel animated zoomIn delay-0.5s">
              <h5 class="widget-title">Cards</h5>
              <span class="widget-title-text">350,897</span>
            </div>
            <div class="cel-auto">
              <div class="icon-shape orange animated zoomIn delay-0.5s">
                <v-icon color="white">mdi-cards</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col>
      <div class="dashboard-widget">
        <div class="card-stats">
          <div class="raww">
            <div class="cel animated zoomIn delay-0.5s">
              <h5 class="widget-title">Groups</h5>
              <span class="widget-title-text">350,897</span>
            </div>
            <div class="cel-auto">
              <div class="icon-shape red animated zoomIn delay-0.5s">
                <v-icon color="white">mdi-format-list-bulleted</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
    <v-col>
      <div class="dashboard-widget">
        <div class="card-stats">
          <div class="raww">
            <div class="cel animated zoomIn delay-0.5s">
              <h5 class="widget-title">Cash</h5>
              <span class="widget-title-text">350,897</span>
            </div>
            <div class="cel-auto">
              <div class="icon-shape green animated zoomIn delay-0.5s">
                <v-icon color="white">mdi-cash</v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.dashboard-widget {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
}

.card-stats {
  padding: 1rem 1.5rem;
}
.raww {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.cel {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
.widget-title {
  color: #8898aa !important;
  text-transform: uppercase !important;
  margin-bottom: 0 !important;
}
.widget-title-text {
  font-weight: 600 !important;
  margin-bottom: 0 !important;
  font-size: 1.25rem;
}
.cel-auto {
  flex: 0 0 auto;
  width: auto;
  max-width: none;
}
.icon-shape {
  padding: 12px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  color: #fff !important;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
}
.icon-shape i {
  font-size: 1.25rem;
}
.dashboard-p {
  font-size: 0.875rem !important;
  color: #8898aa !important;
  margin-top: 1rem !important;
  margin-bottom: 0 !important;
}
.dashboard-p .paragraph {
  color: #2dce89 !important;
  margin-right: 0.5rem !important;
}
.nowrap {
  white-space: nowrap !important;
}
</style>