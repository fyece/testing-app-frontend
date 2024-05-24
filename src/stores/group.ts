import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Group } from '@/interfaces/group.interface'
import instance from '@/api/axios'

export const useGroupStore = defineStore('group', () => {
  async function getAllGroups() {
    try {
      const { data } = await instance.get('groups')
      const groups: Group[] = data
      return {
        status: 'success',
        groups: groups
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function searchGroups(query: string) {
    let groups = null
    try {
      instance.get(`groups?search=${query}`).then((response) => (groups = response.data))
    } catch (error) {
      console.warn(error)
    }
    return groups
  }

  async function getGroupById(id: number) {
    try {
      const { data } = await instance.get(`groups/${id}`)
      const group: Group = data
      return {
        status: 'success',
        group
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  return { getAllGroups, searchGroups, getGroupById }
})
