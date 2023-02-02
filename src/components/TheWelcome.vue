<script setup lang="ts">
import AccordianItem from './AccordianItem.vue';
</script>

<template>
  <div id="home-container">
    <div class="intro-container">
      <!-- <h1>Integration Toolkit Admin</h1> -->
      <h1>
        Welcome to the integration toolkit admin website. Currently only vlan
        and bench edits are supported.
      </h1>
    </div>
    <div class="faq-container">
      <h1>Frequently Asked Questions</h1>
      <AccordianItem>
        <template #questionText>How do I create an account?</template>
        <template #answerText
          >At this time the only solution to create an account is by request.
          Please send all requests to
          <a
            href="mailto: james.conn@pomeroy.com?subject=Integration Toolkit Admin Account Request"
            >James Conn</a
          >. Please include your prefered username and the justification for
          needing admin access. A self service option is also being developed
          and will be completed shortly.</template
        >
      </AccordianItem>
      <AccordianItem>
        <template #questionText>How do I edit the vlan list?</template>
        <template #answerText
          >Click on the <RouterLink to="/vlans">Vlans</RouterLink> tab at the
          top of the page. Find the vlan you would like to edit and click the
          chevron in the top right corner. This will expand the menu. Make all
          changes and click the checkmark in the bottom left hand corner to save
          changes.
          <b>You will need an admin account to view this page.</b></template
        >
      </AccordianItem>
      <AccordianItem>
        <template #questionText
          >How do I reset my password or get help logging in?</template
        >
        <template #answerText
          >At this time the only solution is sending a request to
          <a
            href="mailto: james.conn@pomeroy.com?subject=Integration Toolkit Admin Account Support"
            >James Conn</a
          >. Please include a description of the issue in the body of the
          email.</template
        >
      </AccordianItem>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

#home-container {
  padding: 1.5rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
}

#home-container h1 {
  color: #fff;
}

.faq-container {
  margin-top: 8rem;
}

/* .faq-container h1 {
  
} */
</style>
