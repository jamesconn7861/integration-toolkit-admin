<template>
  <details>
    <summary>
      <slot name="questionText"></slot>
    </summary>
    <div>
      <slot name="answerText"></slot>
    </div>
  </details>
</template>

<style scoped>
details {
  background-color: #303030;
  color: #fff;
  font-size: 1.5rem;
}

details div {
  font-size: 1.2rem;
  transition: height 1s ease;
}

summary {
  padding: 0.5em 1.3rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

summary:hover {
  background-color: #3a3a3a;
  cursor: pointer;
}

summary::-webkit-details-marker {
  display: none;
}

summary:after {
  content: '\002B';
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}

details[open] summary:after {
  content: '\00D7';
}

details[open] div {
  padding: 0.5em 1em;
}
</style>
