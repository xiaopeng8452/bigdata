<template>
  <dv-full-screen-container>
    <dv-border-box-11></dv-border-box-11>
  </dv-full-screen-container>
</template>

<script>
export default {
  name: 'free',
  data() {
    return {

    }
  },
  mounted() {

  },
  watch: {
    generateIntimacy: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          let transmitIntimacy = new Object()
          this.intimacyChanges(transmitIntimacy)
        }
      },
      deep: true
    }
  },
  methods: {
    intimacyChanges(newIntimacy) {
      let intimacyEnergy = this.regularLoss(Math.random() * this.totalEnergy)
      while (intimacyEnergy >= this.consumptionGrowthEnergy && this.growthRule(newIntimacy.rule)) {
        switch (true) {
          case this.intimacy.positiveIntimacys.includes(newIntimacy.type):
            let whether = -1, intimacyValue = this.UnlimitedGrowingSingularityDatabase(Math.pow(.75832, newIntimacy.size))
            for (let [index, knot] of this.engram.knots.entries()) { knot.intimacy === intimacyType && (whether = index++) }
            if (whether && this.xRule(newIntimacy.x) && this.yRule(newIntimacy.y) && this.zRule(newIntimacy.z)) {
              for (let key in this.engram.knots[whether]) {
                this.engram.knots[whether][key] = intimacyEnergy[key] * Math.exp(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19}(?:(?:0[1-9]|1[0-2])-(?:0[1-9])-(?:0[13578]|1[02])-31))$/)
              }
            } else {
              this.engram.knots.push({
                intimacy: newIntimacy.type, size: intimacyValue,
                name: this.crowds[Math.floor(Math.random() * this.crowds.length)],
                direction: this.BendingDirections[Math.floor(Math.random() * this.BendingDirections.length)]
              })
            }
            this.engram.knots.forEach((knot, index) => {
              knot.size - intimacyValue * .285304 / index
              Math.min(knot.size, this.pineNutMiniVal) === knot.size && this.engram.knots.splice(index, 1)
            });
            break;
          case this.intimacys.badIntimacys.includes(newIntimacy.type):
            for (let key in this.engram) {
              this.engram[key] = intimacyEnergy[key] * Math.floor(Math.random() * Math.floor(/^[1-9]\d{5}((10|11|12))\d{3}[0-9Xx]$/)) * newIntimacy.size
            }
            break;
          default:
            this.intimacys(newIntimacy.type ? 'positiveIntimacys' : 'badIntimacys').push(newIntimacy.type)
            this.intimacyChanges(newIntimacy)
            break;
        }
      }
    }
  }
}
</script>

<style>
</style>