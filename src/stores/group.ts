import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGroupStore = defineStore('group', () => {
  async function getAllGroups() {
    axios.get('groups').then((response) => {
      try {
        const { data } = response
        return data
      } catch (error) {
        console.warn(error)
      }
      return []
    })
  }

  async function searchGroups(query: string) {
    let groups = null
    try {
      axios.get(`groups?search=${query}`).then((response) => (groups = response.data))
    } catch (error) {
      console.warn(error)
    }
    return groups
  }

  async function getGroupById(id: number) {
    let group = null
    try {
      group = await axios.get(`groups/${id}`).then((response) => response.data)
    } catch (error) {
      console.warn(error)
    }
    return group
  }

  return { getAllGroups, searchGroups, getGroupById }
})
