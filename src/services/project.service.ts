import { apiRequest } from '@/api/request'
import type { ProjectMemberProp, ProjectProp, ProjectResponse } from '@/contracts'

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getProjects = async (
  page: number,
  limit: number
): Promise<ProjectResponse> => {
  return apiRequest<ProjectResponse>({
    url: '/projects',
    method: 'get',
    params: { page, limit },
  })
}

export const getProjectById = async (projectId: string): Promise<ProjectProp> => {
  return apiRequest<ProjectProp>({
    url: `/projects/${projectId}`,
    method: 'get',
    params: {},
  })
}

export const getProjectStatus = async (projectId: string): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/status/${projectId}`,
    method: 'get',
    params: {},
  })
}

export const getRelatedProjects = async (
  projectId: string,
  page: number,
  limit: number
): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/related/${projectId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getRelatedProjectReseller = async (
  projectId: string,
  page: number,
  limit: number
): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/related/reseller/${projectId}`,
    method: 'get',
    params: { page, limit },
  })
}

export const getRelatedProjectTickets = async (
  projectId: string,
  page: number,
  limit: number
): Promise<ProjectProp> => {
  return apiRequest({
    url: `/projects/${projectId}/tickets`,
    method: 'get',
    params: { page, limit },
  })
}

//----------------------------------------------------- POST DATA ---------------------------------------------------------
export const createProject = async (projectData: ProjectProp) => {
  return apiRequest({
    url: '/projects',
    method: 'post',
    data: new URLSearchParams({
      name: projectData.name,
      'date[start]': projectData.date.start,
      'date[end]': projectData.date.end,
      'raffleConfig[img]': projectData.raffleConfig.img || '',
      'raffleConfig[priceTicket]': projectData.raffleConfig.priceTicket.toString(),
      'raffleConfig[totalTickets]': projectData.raffleConfig.totalTickets.toString(),
      'raffleConfig[perTicket]': projectData.raffleConfig.perTicket.toString(),
      'raffleConfig[qrPosition]': projectData.raffleConfig.qrPosition,
      'raffleConfig[numberPosition]': projectData.raffleConfig.numberPosition,
      'raffleConfig[orientation]': projectData.raffleConfig.orientation,
      owner: projectData.owner.id as string,
      state: projectData.state.join(','),
    }).toString(),
  })
}

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------
export const updateProject = async (projectData: ProjectProp) => {
  return apiRequest({
    url: '/projects',
    method: 'put',
    data: new URLSearchParams({
      id: projectData.id as string,
      name: projectData.name,
      'date[start]': projectData.date.start,
      'date[end]': projectData.date.end,
      'raffleConfig[img]': projectData.raffleConfig.img,
      'raffleConfig[priceTicket]': projectData.raffleConfig.priceTicket.toString(),
      'raffleConfig[totalTickets]': projectData.raffleConfig.totalTickets.toString(),
      'raffleConfig[perTicket]': projectData.raffleConfig.perTicket.toString(),
      'raffleConfig[qrPosition]': projectData.raffleConfig.qrPosition,
      'raffleConfig[numberPosition]': projectData.raffleConfig.numberPosition,
      'raffleConfig[orientation]': projectData.raffleConfig.orientation,
      owner: projectData.owner.id as string,
      state: projectData.state.join(','),
    }).toString(),
  })
}

export const updateProjectMember = async (projectData: ProjectMemberProp) => {
  return apiRequest({
    url: '/projects/members',
    method: 'put',
    data: new URLSearchParams({
      id: projectData.id as string,
      members: JSON.stringify(projectData.members),
    }),
  })
}

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------
export const deleteProject = async (projectId: string) => {
  return apiRequest({
    url: '/projects',
    method: 'delete',
    data: new URLSearchParams({ id: projectId }).toString(),
  })
}
