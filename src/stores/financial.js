import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFinancialStore = defineStore('financial', () => {
  // 默认数据
  const defaultData = {
    monthlyExpense: 15000,      // 预期月支出
    yearlyReturn: 7,            // 预期年化收益率 (%)
    monthlyIncome: 30000,       // 月收入
    monthlyFixedCost: 8000,     // 月固定支出
    currentSavings: 500000,    // 现有资金
    targetYears: 10            // 目标达成时间 (年)
  }

  // 状态
  const data = ref({ ...defaultData })

  // 计算结果
  const results = computed(() => {
    const { monthlyExpense, yearlyReturn, monthlyIncome, monthlyFixedCost, currentSavings, targetYears } = data.value

    // 计算所需本金 (4%法则: 本金 = 年支出 / 4%)
    const yearlyExpense = monthlyExpense * 12
    const requiredCapital = yearlyExpense / (yearlyReturn / 100)

    // 计算月度盈余
    const monthlySurplus = monthlyIncome - monthlyFixedCost

    // 计算按现有盈余达成时间
    // 公式: FV = PV * (1+r)^n + PMT * ((1+r)^n - 1)/r
    // 需要求解 n
    let timeToGoal = Infinity
    if (monthlySurplus > 0 && requiredCapital > currentSavings) {
      const monthlyRate = yearlyReturn / 100 / 12
      const target = requiredCapital - currentSavings
      // 简化计算: 使用对数近似
      if (monthlyRate > 0) {
        const n = Math.log(1 + (target * monthlyRate) / monthlySurplus) / Math.log(1 + monthlyRate)
        timeToGoal = n / 12
      }
    } else if (currentSavings >= requiredCapital) {
      timeToGoal = 0
    }

    // 计算按目标时间所需月储蓄
    let requiredMonthlySaving = 0
    if (targetYears > 0) {
      const monthlyRate = yearlyReturn / 100 / 12
      const months = targetYears * 12
      const target = requiredCapital - currentSavings
      if (monthlyRate > 0) {
        requiredMonthlySaving = target * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
      } else {
        requiredMonthlySaving = target / months
      }
    }

    // 计算进度
    const progress = Math.min(100, Math.max(0, (currentSavings / requiredCapital) * 100))

    return {
      requiredCapital,
      monthlySurplus,
      timeToGoal,
      requiredMonthlySaving,
      progress
    }
  })

  // 更新数据
  function updateData(field, value) {
    data.value[field] = value
    calculateResults()
  }

  // 计算结果
  function calculateResults() {
    // 触发 computed 重新计算
    results.value
  }

  // 初始化数据
  function initData() {
    const saved = localStorage.getItem('fire-financial-data')
    if (saved) {
      try {
        data.value = { ...defaultData, ...JSON.parse(saved) }
      } catch (e) {
        console.error('Failed to load saved data:', e)
      }
    }
  }

  // 保存数据到文件
  function saveDataToFile() {
    const blob = new Blob([JSON.stringify(data.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fire-financial-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 从文件导入数据
  async function importDataFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result)
          data.value = { ...defaultData, ...imported }
          localStorage.setItem('fire-financial-data', JSON.stringify(data.value))
          calculateResults()
          resolve()
        } catch (error) {
          reject('导入失败: 文件格式不正确')
        }
      }
      reader.onerror = () => reject('导入失败: 无法读取文件')
      reader.readAsText(file)
    })
  }

  return {
    data,
    results,
    updateData,
    calculateResults,
    initData,
    saveDataToFile,
    importDataFromFile
  }
})
