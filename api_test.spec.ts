/**
 * Passage Management API
 * Passage's management API to manage your Passage apps and users.
 *
 * OpenAPI spec version: 1
 * Contact: support@passage.id
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("ApiKeysApi", () => {
  let instance: api.ApiKeysApi
  beforeEach(function() {
    instance = new api.ApiKeysApi(config)
  });

  test("createApikey", () => {
    const body: api.CreateApiKeyRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.createApikey(body, appId, {})).resolves.toBe(null)
  })
  test("deleteApikey", () => {
    const appId: string = "appId_example"
    const apiKeyId: string = "apiKeyId_example"
    return expect(instance.deleteApikey(appId, apiKeyId, {})).resolves.toBe(null)
  })
  test("getApikey", () => {
    const appId: string = "appId_example"
    const apiKeyId: string = "apiKeyId_example"
    return expect(instance.getApikey(appId, apiKeyId, {})).resolves.toBe(null)
  })
  test("listApikeys", () => {
    const appId: string = "appId_example"
    return expect(instance.listApikeys(appId, {})).resolves.toBe(null)
  })
  test("updateApikey", () => {
    const body: api.UpdateApiKeyRequest = undefined
    const appId: string = "appId_example"
    const apiKeyId: string = "apiKeyId_example"
    return expect(instance.updateApikey(body, appId, apiKeyId, {})).resolves.toBe(null)
  })
})

describe("AppMetadataSchemaApi", () => {
  let instance: api.AppMetadataSchemaApi
  beforeEach(function() {
    instance = new api.AppMetadataSchemaApi(config)
  });

  test("addAppMetadataSchema", () => {
    const body: Array<api.CreateUserMetadataField> = undefined
    const appId: string = "appId_example"
    return expect(instance.addAppMetadataSchema(body, appId, {})).resolves.toBe(null)
  })
  test("deleteMetadataField", () => {
    const appId: string = "appId_example"
    const metadataFieldId: string = "metadataFieldId_example"
    return expect(instance.deleteMetadataField(appId, metadataFieldId, {})).resolves.toBe(null)
  })
  test("getAppMetadataSchema", () => {
    const appId: string = "appId_example"
    return expect(instance.getAppMetadataSchema(appId, {})).resolves.toBe(null)
  })
  test("getMetadataField", () => {
    const appId: string = "appId_example"
    const metadataFieldId: string = "metadataFieldId_example"
    return expect(instance.getMetadataField(appId, metadataFieldId, {})).resolves.toBe(null)
  })
  test("updateAppLayouts", () => {
    const body: api.Layouts = undefined
    const appId: string = "appId_example"
    return expect(instance.updateAppLayouts(body, appId, {})).resolves.toBe(null)
  })
  test("updateMetadataField", () => {
    const body: api.UpdateUserMetadataField = undefined
    const appId: string = "appId_example"
    const metadataFieldId: string = "metadataFieldId_example"
    return expect(instance.updateMetadataField(body, appId, metadataFieldId, {})).resolves.toBe(null)
  })
})

describe("AppsApi", () => {
  let instance: api.AppsApi
  beforeEach(function() {
    instance = new api.AppsApi(config)
  });

  test("claimApp", () => {
    const body: api.ClaimAppRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.claimApp(body, appId, {})).resolves.toBe(null)
  })
  test("createApp", () => {
    const body: api.CreateAppRequest = undefined
    return expect(instance.createApp(body, {})).resolves.toBe(null)
  })
  test("deleteApp", () => {
    const appId: string = "appId_example"
    return expect(instance.deleteApp(appId, {})).resolves.toBe(null)
  })
  test("getApp", () => {
    const appId: string = "appId_example"
    return expect(instance.getApp(appId, {})).resolves.toBe(null)
  })
  test("getAppStats", () => {
    const appId: string = "appId_example"
    return expect(instance.getAppStats(appId, {})).resolves.toBe(null)
  })
  test("updateApp", () => {
    const body: api.UpdateAppRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.updateApp(body, appId, {})).resolves.toBe(null)
  })
})

describe("EmailProvidersApi", () => {
  let instance: api.EmailProvidersApi
  beforeEach(function() {
    instance = new api.EmailProvidersApi(config)
  });

  test("createEmailProviderHandler", () => {
    const body: api.EmailProvider = undefined
    const appId: string = "appId_example"
    return expect(instance.createEmailProviderHandler(body, appId, {})).resolves.toBe(null)
  })
  test("getEmailProviderHandler", () => {
    const appId: string = "appId_example"
    return expect(instance.getEmailProviderHandler(appId, {})).resolves.toBe(null)
  })
  test("updateEmailProviderHandler", () => {
    const body: api.EmailProvider = undefined
    const appId: string = "appId_example"
    return expect(instance.updateEmailProviderHandler(body, appId, {})).resolves.toBe(null)
  })
})

describe("EmailTemplateApi", () => {
  let instance: api.EmailTemplateApi
  beforeEach(function() {
    instance = new api.EmailTemplateApi(config)
  });

  test("createEmailTemplateHandler", () => {
    const body: api.CreateEmailTemplateRequest = {
  "$ref" : "#/components/examples/newEmailTemplate"
}
    const appId: string = "appId_example"
    return expect(instance.createEmailTemplateHandler(body, appId, {})).resolves.toBe(null)
  })
  test("deleteEmailTemplateHandler", () => {
    const appId: string = "appId_example"
    const templateId: string = "templateId_example"
    return expect(instance.deleteEmailTemplateHandler(appId, templateId, {})).resolves.toBe(null)
  })
  test("getEmailTemplateHandler", () => {
    const appId: string = "appId_example"
    const templateId: string = "templateId_example"
    return expect(instance.getEmailTemplateHandler(appId, templateId, {})).resolves.toBe(null)
  })
  test("listEmailTemplatesHandler", () => {
    const appId: string = "appId_example"
    return expect(instance.listEmailTemplatesHandler(appId, {})).resolves.toBe(null)
  })
  test("updateEmailTemplateHandler", () => {
    const appId: string = "appId_example"
    const templateId: string = "templateId_example"
    const body: api.UpdateEmailTemplateRequest = {
  "$ref" : "#/components/examples/enabledEmailTemplate"
}
    return expect(instance.updateEmailTemplateHandler(appId, templateId, body, {})).resolves.toBe(null)
  })
})

describe("EmailTestApi", () => {
  let instance: api.EmailTestApi
  beforeEach(function() {
    instance = new api.EmailTestApi(config)
  });

  test("sendTestEmailHandler", () => {
    const body: api.SendEmailRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.sendTestEmailHandler(body, appId, {})).resolves.toBe(null)
  })
})

describe("EventsApi", () => {
  let instance: api.EventsApi
  beforeEach(function() {
    instance = new api.EventsApi(config)
  });

  test("getEvent", () => {
    const appId: string = "appId_example"
    const eventId: string = "eventId_example"
    return expect(instance.getEvent(appId, eventId, {})).resolves.toBe(null)
  })
  test("listPaginatedEvents", () => {
    const appId: string = "appId_example"
    const page: number = 56
    const limit: number = 56
    const createdBefore: number = 56
    const orderBy: string = "orderBy_example"
    const id: string = "id_example"
    const identifier: string = "identifier_example"
    const userId: string = "userId_example"
    const type: string = "type_example"
    const ipAddr: string = "ipAddr_example"
    const userAgent: string = "userAgent_example"
    const createdAt: string = "createdAt_example"
    return expect(instance.listPaginatedEvents(appId, page, limit, createdBefore, orderBy, id, identifier, userId, type, ipAddr, userAgent, createdAt, {})).resolves.toBe(null)
  })
})

describe("MagicLinkApi", () => {
  let instance: api.MagicLinkApi
  beforeEach(function() {
    instance = new api.MagicLinkApi(config)
  });

  test("createMagicLink", () => {
    const body: api.CreateMagicLinkRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.createMagicLink(body, appId, {})).resolves.toBe(null)
  })
})

describe("TokensApi", () => {
  let instance: api.TokensApi
  beforeEach(function() {
    instance = new api.TokensApi(config)
  });

  test("revokeUserRefreshTokens", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.revokeUserRefreshTokens(appId, userId, {})).resolves.toBe(null)
  })
})

describe("UserDevicesApi", () => {
  let instance: api.UserDevicesApi
  beforeEach(function() {
    instance = new api.UserDevicesApi(config)
  });

  test("deleteUserDevices", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    const deviceId: string = "deviceId_example"
    return expect(instance.deleteUserDevices(appId, userId, deviceId, {})).resolves.toBe(null)
  })
  test("listUserDevices", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.listUserDevices(appId, userId, {})).resolves.toBe(null)
  })
})

describe("UsersApi", () => {
  let instance: api.UsersApi
  beforeEach(function() {
    instance = new api.UsersApi(config)
  });

  test("activateUser", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.activateUser(appId, userId, {})).resolves.toBe(null)
  })
  test("createUser", () => {
    const body: api.CreateUserRequest = undefined
    const appId: string = "appId_example"
    return expect(instance.createUser(body, appId, {})).resolves.toBe(null)
  })
  test("deactivateUser", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.deactivateUser(appId, userId, {})).resolves.toBe(null)
  })
  test("deleteUser", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.deleteUser(appId, userId, {})).resolves.toBe(null)
  })
  test("getUser", () => {
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.getUser(appId, userId, {})).resolves.toBe(null)
  })
  test("importUsers", () => {
    const csvUserImport: Blob = "csvUserImport_example"
    const appId: string = "appId_example"
    return expect(instance.importUsers(csvUserImport, appId, {})).resolves.toBe(null)
  })
  test("listPaginatedUsers", () => {
    const appId: string = "appId_example"
    const page: number = 56
    const limit: number = 56
    const createdBefore: number = 56
    const orderBy: string = "orderBy_example"
    const identifier: string = "identifier_example"
    const id: string = "id_example"
    const loginCount: number = 56
    const status: string = "status_example"
    const emailVerified: boolean = true
    const createdAt: string = "createdAt_example"
    const updatedAt: string = "updatedAt_example"
    const lastLoginAt: string = "lastLoginAt_example"
    return expect(instance.listPaginatedUsers(appId, page, limit, createdBefore, orderBy, identifier, id, loginCount, status, emailVerified, createdAt, updatedAt, lastLoginAt, {})).resolves.toBe(null)
  })
  test("updateUser", () => {
    const body: api.UpdateUserRequest = undefined
    const appId: string = "appId_example"
    const userId: string = "userId_example"
    return expect(instance.updateUser(body, appId, userId, {})).resolves.toBe(null)
  })
})
