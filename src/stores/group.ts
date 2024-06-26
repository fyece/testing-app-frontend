import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CreateGroupDto, Group } from '@/interfaces/group.interface'
import instance from '@/api/axios'
import type { User } from '@/interfaces/user.interface'

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

  async function getGroupMembers(id: number) {
    try {
      const { data } = await instance.get(`groups/${id}/members`)
      const users: User[] = data
      return {
        status: 'success',
        users
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  async function createGroup(group: CreateGroupDto) {
    try {
      const { data } = await instance.post('groups', group)
      return {
        status: 'success',
        group: data
      }
    } catch (error) {
      return {
        status: 'failed'
      }
    }
  }

  return { getAllGroups, getGroupMembers, searchGroups, getGroupById, createGroup }
})
