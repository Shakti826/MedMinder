/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// import { GoogleGenAI } from '@google/genai'; // Kept for future, not used in this phase

interface User {
  id: string;
  username: string;
  // Password is not stored in appState, only used during login/registration
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  assignedTo: string; // familyMemberId or 'self'
  duration?: string;
  taken?: boolean;
}

interface EmergencyContact {
  id: string; // Unique ID for the contact itself
  name: string;
  phone: string;
  relationship: string;
}

interface FamilyMember {
  id: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  medicalConditions?: string;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown' | '';
  allergies?: string;
  emergencyContacts: EmergencyContact[]; // Array of emergency contacts
  otherMedicalInfo?: string;
}

interface Appointment {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  assignedTo: string; // familyMemberId or 'self'
  notes?: string;
  completed: boolean;
}

interface HealthRecord {
  id: string;
  title: string;
  recordType: string; // e.g., 'prescription', 'lab_report'
  date: string;
  assignedTo: string; // familyMemberId or 'self'
  fileName: string;
  fileDataUrl: string; // Base64 encoded file
  fileType: string; // MIME type
  notes?: string;
}

interface AppState {
  currentUser: User | null; // Added for logged-in user context
  medications: Medication[];
  familyMembers: FamilyMember[];
  appointments: Appointment[];
  healthRecords: HealthRecord[];
  currentView: string;
  language: 'en' | 'es';
  isLandingActive: boolean;

  // Loading states
  isLoadingMedications: boolean;
  isLoadingFamilyMembers: boolean;
  isLoadingAppointments: boolean;

  // Editing states
  editingMedicationId: string | null;
  editingFamilyMemberId: string | null;
  editingAppointmentId: string | null;

  // Notification states
  notificationPermission: 'default' | 'granted' | 'denied';
  lastNotificationTimestamps: { [key: string]: number }; // Stores timestamp of last notification for an item
}

const translations = {
  en: {
    appName: "MedMinder",
    landingTagline: "Your personal health companion, simplified.",
    getStarted: "Get Started",
    featuresTitle: "Everything you need, in one place.",
    featureRemindersTitle: "Medicine Reminders",
    featureRemindersDesc: "Never miss a dose with smart, customizable reminders for all your medications.",
    featureAppointmentsTitle: "Appointment Scheduling",
    featureAppointmentsDesc: "Keep track of all doctor visits and lab tests. Sync with your calendar effortlessly.",
    featureRecordsTitle: "Digital Health Records",
    featureRecordsDesc: "Securely store and access prescriptions, lab reports, and scans anytime, anywhere.",
    navDashboard: "Dashboard",
    navReminders: "Reminders",
    navAppointments: "Appointments",
    navRecords: "Records",
    navEmergency: "Emergency",
    navFamily: "Family",
    logout: "Logout",
    welcomeUser: "Welcome",
    addReminder: "Add Reminder",
    editReminder: "Edit Reminder",
    updateReminder: "Update Reminder",
    medicationName: "Medication Name",
    dosage: "Dosage (e.g., 1 tablet, 5mg)",
    frequency: "Frequency (e.g., Once daily)",
    time: "Time (e.g., 08:00 AM)",
    duration: "Duration (e.g., 7 days, ongoing)",
    assignedTo: "Assigned to",
    self: "Self",
    add: "Add",
    update: "Update",
    saving: "Saving...",
    deleting: "Deleting...",
    loading: "Loading...",
    noReminders: "No active medicine reminders.",
    taken: "Taken",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    upcomingReminders: "Upcoming Reminders",
    manageFamily: "Manage Family Members",
    addMember: "Add Member",
    editMember: "Edit Member",
    updateMember: "Update Member",
    memberName: "Member Name",
    age: "Age",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other",
    genderPreferNotToSay: "Prefer not to say",
    medicalConditions: "Medical Conditions (optional)",
    bloodType: "Blood Type",
    bloodTypeUnknown: "Unknown",
    allergies: "Allergies (optional)",
    emergencyContacts: "Emergency Contacts",
    addEmergencyContact: "Add Emergency Contact",
    contactName: "Contact Name",
    contactPhone: "Phone",
    contactRelationship: "Relationship",
    removeContact: "Remove",
    otherMedicalInfo: "Other Medical Info (optional)",
    noFamilyMembers: "No family members added yet.",
    viewNotImplemented: "This feature is not yet implemented.",
    selectMember: "Select Member",
    selectGender: "Select Gender",
    selectBloodType: "Select Blood Type",
    // Dashboard translations
    welcomeDashboard: "Welcome to MedMinder!",
    dashboardGreeting: "Hello!",
    dashboardMessage: "Here's a quick overview of your health activities.",
    statReminders: "Active Reminders",
    statAppointmentsToday: "Appointments Today",
    statFamilyMembers: "Family Members",
    quickAddReminder: "Add New Reminder",
    quickAddAppointment: "Schedule Appointment",
    noUpcomingReminders: "No upcoming reminders for today.",
    noAppointmentsToday: "No appointments scheduled for today.",
    // Appointments translations
    addAppointment: "Add Appointment",
    editAppointment: "Edit Appointment",
    updateAppointment: "Update Appointment",
    appointmentTitle: "Title (e.g., Doctor Visit)",
    appointmentDescription: "Description (optional)",
    appointmentDate: "Date",
    appointmentTime: "Time",
    appointmentLocation: "Location (optional)",
    appointmentNotes: "Notes/Checklist (optional)",
    noAppointments: "No upcoming appointments.",
    upcomingAppointments: "Upcoming Appointments",
    markCompleted: "Mark Completed",
    undo: "Undo",
    completed: "Completed",
    // Health Records translations
    addRecord: "Add Health Record",
    recordTitle: "Record Title (e.g., Blood Test Results)",
    recordType: "Record Type",
    recordTypePrescription: "Prescription",
    recordTypeLabReport: "Lab Report",
    recordTypeScan: "Scan/Imaging",
    recordTypeVaccination: "Vaccination Record",
    recordTypeOther: "Other",
    recordDate: "Date of Record",
    recordFile: "Upload File (Image/PDF, max 2MB)",
    recordNotes: "Notes (optional)",
    noRecords: "No health records uploaded yet.",
    uploadedRecords: "Uploaded Health Records",
    viewDownload: "View/Download",
    fileName: "File",
    errorFileSizeTooLarge: "File is too large. Max 2MB allowed.",
    // Emergency View
    emergencyInformation: "Emergency Information",
    noEmergencyInfo: "No emergency information available for this member.",
    viewFullDetailsInFamily: "View/Edit full details in Family section.",
    noFamilyForEmergency: "No family members to display emergency information for.",
    // Notifications
    notificationPermissionRequest: "MedMinder needs permission to show notifications for reminders.",
    enableNotifications: "Enable Notifications",
    notificationsEnabled: "Notifications are enabled.",
    notificationsDenied: "Notification permission was denied. Please enable it in your browser settings if you want reminders.",
    notificationsDefault: "Notification permission pending. Click 'Enable Notifications' to receive reminders.",
    medicationReminderTitle: "MedMinder: Medicine Reminder",
    medicationReminderBody: "It's time to take your %s.", // %s will be medication name
    appointmentReminderTitle: "MedMinder: Appointment Reminder",
    appointmentReminderBody: "Upcoming appointment: %s at %s.", // %s will be appointment title and time
    // General
    errorAPI: "An error occurred. Please try again.",
    loadingMedications: "Loading medications...",
    loadingFamilyMembers: "Loading family members...",
    loadingAppointments: "Loading appointments...",
  },
  es: {
    appName: "MedMinder",
    landingTagline: "Tu compañero de salud personal, simplificado.",
    getStarted: "Comenzar",
    featuresTitle: "Todo lo que necesitas, en un solo lugar.",
    featureRemindersTitle: "Recordatorios de Medicinas",
    featureRemindersDesc: "No olvides ni una dosis con recordatorios inteligentes y personalizables para todos tus medicamentos.",
    featureAppointmentsTitle: "Agenda de Citas",
    featureAppointmentsDesc: "Mantén un registro de todas las visitas al médico y pruebas de laboratorio. Sincroniza con tu calendario sin esfuerzo.",
    featureRecordsTitle: "Registros de Salud Digitales",
    featureRecordsDesc: "Almacena y accede de forma segura a recetas, informes de laboratorio y escaneos en cualquier momento y lugar.",
    navDashboard: "Panel",
    navReminders: "Recordatorios",
    navAppointments: "Citas",
    navRecords: "Registros Médicos",
    navEmergency: "Emergencia",
    navFamily: "Familia",
    logout: "Cerrar Sesión",
    welcomeUser: "Bienvenido",
    addReminder: "Añadir Recordatorio",
    editReminder: "Editar Recordatorio",
    updateReminder: "Actualizar Recordatorio",
    medicationName: "Nombre del Medicamento",
    dosage: "Dosis (ej. 1 pastilla, 5mg)",
    frequency: "Frecuencia (ej. Una vez al día)",
    time: "Hora (ej. 08:00 AM)",
    duration: "Duración (ej. 7 días, continuo)",
    assignedTo: "Asignado a",
    self: "Yo mismo",
    add: "Añadir",
    update: "Actualizar",
    saving: "Guardando...",
    deleting: "Eliminando...",
    loading: "Cargando...",
    noReminders: "No hay recordatorios de medicamentos activos.",
    taken: "Tomada",
    delete: "Eliminar",
    edit: "Editar",
    cancel: "Cancelar",
    upcomingReminders: "Próximos Recordatorios",
    manageFamily: "Gestionar Miembros de Familia",
    addMember: "Añadir Miembro",
    editMember: "Editar Miembro",
    updateMember: "Actualizar Miembro",
    memberName: "Nombre del Miembro",
    age: "Edad",
    gender: "Género",
    genderMale: "Masculino",
    genderFemale: "Femenino",
    genderOther: "Otro",
    genderPreferNotToSay: "Prefiero no decirlo",
    medicalConditions: "Condiciones Médicas (opcional)",
    bloodType: "Grupo Sanguíneo",
    bloodTypeUnknown: "Desconocido",
    allergies: "Alergias (opcional)",
    emergencyContacts: "Contactos de Emergencia",
    addEmergencyContact: "Añadir Contacto de Emergencia",
    contactName: "Nombre del Contacto",
    contactPhone: "Teléfono",
    contactRelationship: "Relación",
    removeContact: "Quitar",
    otherMedicalInfo: "Otra Información Médica (opcional)",
    noFamilyMembers: "Aún no se han añadido miembros a la familia.",
    viewNotImplemented: "Esta función aún no está implementada.",
    selectMember: "Seleccionar Miembro",
    selectGender: "Seleccionar Género",
    selectBloodType: "Seleccionar Grupo Sanguíneo",
    // Dashboard translations
    welcomeDashboard: "¡Bienvenido a MedMinder!",
    dashboardGreeting: "¡Hola!",
    dashboardMessage: "Aquí tienes un resumen rápido de tus actividades de salud.",
    statReminders: "Recordatorios Activos",
    statAppointmentsToday: "Citas para Hoy",
    statFamilyMembers: "Miembros Familiares",
    quickAddReminder: "Añadir Recordatorio",
    quickAddAppointment: "Agendar Cita",
    noUpcomingReminders: "No hay recordatorios próximos para hoy.",
    noAppointmentsToday: "No hay citas programadas para hoy.",
    // Appointments translations
    addAppointment: "Añadir Cita",
    editAppointment: "Editar Cita",
    updateAppointment: "Actualizar Cita",
    appointmentTitle: "Título (ej. Visita Médica)",
    appointmentDescription: "Descripción (opcional)",
    appointmentDate: "Fecha",
    appointmentTime: "Hora",
    appointmentLocation: "Lugar (opcional)",
    appointmentNotes: "Notas/Lista de verificación (opcional)",
    noAppointments: "No hay citas próximas.",
    upcomingAppointments: "Próximas Citas",
    markCompleted: "Marcar como Completada",
    undo: "Deshacer",
    completed: "Completada",
    // Health Records translations
    addRecord: "Añadir Registro Médico",
    recordTitle: "Título del Registro (ej. Resultados Análisis de Sangre)",
    recordType: "Tipo de Registro",
    recordTypePrescription: "Receta",
    recordTypeLabReport: "Informe de Laboratorio",
    recordTypeScan: "Escáner/Imágenes",
    recordTypeVaccination: "Registro de Vacunación",
    recordTypeOther: "Otro",
    recordDate: "Fecha del Registro",
    recordFile: "Subir Archivo (Imagen/PDF, máx 2MB)",
    recordNotes: "Notas (opcional)",
    noRecords: "No hay registros médicos subidos aún.",
    uploadedRecords: "Registros Médicos Subidos",
    viewDownload: "Ver/Descargar",
    fileName: "Archivo",
    errorFileSizeTooLarge: "El archivo es demasiado grande. Máximo 2MB permitido.",
    // Emergency View
    emergencyInformation: "Información de Emergencia",
    noEmergencyInfo: "No hay información de emergencia disponible para este miembro.",
    viewFullDetailsInFamily: "Ver/Editar detalles completos en la sección Familia.",
    noFamilyForEmergency: "No hay miembros familiares para mostrar información de emergencia.",
    // Notifications
    notificationPermissionRequest: "MedMinder necesita permiso para mostrar notificaciones de recordatorios.",
    enableNotifications: "Habilitar Notificaciones",
    notificationsEnabled: "Las notificaciones están habilitadas.",
    notificationsDenied: "Se denegó el permiso de notificación. Habilítelo en la configuración de su navegador si desea recordatorios.",
    notificationsDefault: "Permiso de notificación pendiente. Haga clic en 'Habilitar Notificaciones' para recibir recordatorios.",
    medicationReminderTitle: "MedMinder: Recordatorio de Medicamento",
    medicationReminderBody: "Es hora de tomar tu %s.", // %s will be medication name
    appointmentReminderTitle: "MedMinder: Recordatorio de Cita",
    appointmentReminderBody: "Próxima cita: %s a las %s.", // %s will be appointment title and time
    // General
    errorAPI: "Ocurrió un error. Por favor, inténtalo de nuevo.",
    loadingMedications: "Cargando medicamentos...",
    loadingFamilyMembers: "Cargando miembros de familia...",
    loadingAppointments: "Cargando citas...",
  }
};

const APP_CURRENT_USER_STORAGE_KEY = 'medMinderCurrentUser';
const USER_APP_STATE_PREFIX = 'medMinderAppState_';
let appState: AppState = loadInitialState();

const API_DELAY = 700; // milliseconds
const NOTIFICATION_CHECK_INTERVAL = 60000; // 1 minute
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

// --- Utility Functions ---
function appGenerateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

function getCurrentUser(): User | null {
    const userJson = localStorage.getItem(APP_CURRENT_USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

function setLoadingState(button: HTMLButtonElement | null, isLoading: boolean, defaultTextKey: keyof typeof translations.en, loadingTextKey: keyof typeof translations.en) {
    if (!button) return;
    const defaultText = t(defaultTextKey);
    const loadingText = t(loadingTextKey);
    if (isLoading) {
        button.disabled = true;
        button.textContent = loadingText;
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.textContent = defaultText;
        button.classList.remove('loading');
    }
}

// --- Simulated API Service for Medications ---
async function apiFetchMedications(): Promise<Medication[]> {
  console.log("API: Fetching medications...");
  appState.isLoadingMedications = true;
  renderMedicationList(); // Render with loading state

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API: Medications fetched successfully.");
      appState.isLoadingMedications = false;
      resolve([...appState.medications]);
    }, API_DELAY);
  });
}

async function apiAddMedication(medData: Omit<Medication, 'id' | 'taken'>): Promise<Medication> {
  console.log("API: Adding medication...", medData);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMed: Medication = {
        ...medData,
        id: appGenerateId(),
        taken: false,
      };
      appState.medications.push(newMed);
      saveState();
      console.log("API: Medication added successfully.", newMed);
      resolve(newMed);
    }, API_DELAY);
  });
}

async function apiUpdateMedication(medId: string, updates: Partial<Omit<Medication, 'id'>>): Promise<Medication> {
  console.log(`API: Updating medication ${medId}...`, updates);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const medIndex = appState.medications.findIndex(m => m.id === medId);
      if (medIndex > -1) {
        appState.medications[medIndex] = { ...appState.medications[medIndex], ...updates };
        saveState();
        console.log("API: Medication updated successfully.", appState.medications[medIndex]);
        resolve(appState.medications[medIndex]);
      } else {
        console.error(`API: Error updating medication. ID ${medId} not found.`);
        reject(new Error("Medication not found"));
      }
    }, API_DELAY);
  });
}

async function apiDeleteMedication(medId: string): Promise<void> {
  console.log(`API: Deleting medication ${medId}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = appState.medications.length;
      appState.medications = appState.medications.filter(m => m.id !== medId);
      if (appState.medications.length < initialLength) {
        saveState();
        console.log("API: Medication deleted successfully.");
        resolve();
      } else {
        console.error(`API: Error deleting medication. ID ${medId} not found.`);
        reject(new Error("Medication not found during delete"));
      }
    }, API_DELAY);
  });
}

// --- Simulated API Service for Family Members ---
async function apiFetchFamilyMembers(): Promise<FamilyMember[]> {
  console.log("API: Fetching family members...");
  if (document.getElementById('family-list')) { // Only set loading if list is visible
      appState.isLoadingFamilyMembers = true;
      renderFamilyList();
  } else if (document.getElementById('emergency-details-list')) { // For emergency view
      appState.isLoadingFamilyMembers = true; // Still use this flag
      const listContainer = document.getElementById('emergency-details-list') as HTMLElement;
      if (listContainer) listContainer.innerHTML = `<p>${t('loadingFamilyMembers')}</p>`;
  }


  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API: Family members fetched successfully.");
      appState.isLoadingFamilyMembers = false;
      resolve([...appState.familyMembers]);
    }, API_DELAY);
  });
}

async function apiAddFamilyMember(memberData: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
  console.log("API: Adding family member...", memberData);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMember: FamilyMember = {
        ...memberData,
        id: appGenerateId(),
        emergencyContacts: memberData.emergencyContacts.map(ec => ({...ec, id: ec.id || appGenerateId()})),
      };
      appState.familyMembers.push(newMember);
      saveState();
      console.log("API: Family member added successfully.", newMember);
      resolve(newMember);
    }, API_DELAY);
  });
}

async function apiUpdateFamilyMember(memberId: string, updates: Partial<Omit<FamilyMember, 'id'>>): Promise<FamilyMember> {
  console.log(`API: Updating family member ${memberId}...`, updates);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const memberIndex = appState.familyMembers.findIndex(m => m.id === memberId);
      if (memberIndex > -1) {
        if (updates.emergencyContacts) {
            updates.emergencyContacts = updates.emergencyContacts.map(ec => ({...ec, id: ec.id || appGenerateId()}));
        }
        appState.familyMembers[memberIndex] = { ...appState.familyMembers[memberIndex], ...updates };
        saveState();
        console.log("API: Family member updated successfully.", appState.familyMembers[memberIndex]);
        resolve(appState.familyMembers[memberIndex]);
      } else {
        console.error(`API: Error updating family member. ID ${memberId} not found.`);
        reject(new Error("Family member not found"));
      }
    }, API_DELAY);
  });
}

async function apiDeleteFamilyMember(memberId: string): Promise<void> {
  console.log(`API: Deleting family member ${memberId}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = appState.familyMembers.length;
      appState.familyMembers = appState.familyMembers.filter(m => m.id !== memberId);
      if (appState.familyMembers.length < initialLength) {
        // Reassign items from deleted member to 'self'
        appState.medications.forEach(med => { if (med.assignedTo === memberId) med.assignedTo = 'self'; });
        appState.appointments.forEach(appt => { if (appt.assignedTo === memberId) appt.assignedTo = 'self'; });
        appState.healthRecords.forEach(record => { if (record.assignedTo === memberId) record.assignedTo = 'self'; });
        saveState();
        console.log("API: Family member deleted successfully.");
        resolve();
      } else {
        console.error(`API: Error deleting family member. ID ${memberId} not found.`);
        reject(new Error("Family member not found during delete"));
      }
    }, API_DELAY);
  });
}

// --- Simulated API Service for Appointments ---
async function apiFetchAppointments(): Promise<Appointment[]> {
  console.log("API: Fetching appointments...");
  appState.isLoadingAppointments = true;
  renderAppointmentList(); // Render with loading state

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("API: Appointments fetched successfully.");
      appState.isLoadingAppointments = false;
      resolve([...appState.appointments]);
    }, API_DELAY);
  });
}

async function apiAddAppointment(apptData: Omit<Appointment, 'id' | 'completed'>): Promise<Appointment> {
  console.log("API: Adding appointment...", apptData);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppt: Appointment = {
        ...apptData,
        id: appGenerateId(),
        completed: false,
      };
      appState.appointments.push(newAppt);
      saveState();
      console.log("API: Appointment added successfully.", newAppt);
      resolve(newAppt);
    }, API_DELAY);
  });
}

async function apiUpdateAppointment(apptId: string, updates: Partial<Omit<Appointment, 'id'>>): Promise<Appointment> {
  console.log(`API: Updating appointment ${apptId}...`, updates);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const apptIndex = appState.appointments.findIndex(a => a.id === apptId);
      if (apptIndex > -1) {
        appState.appointments[apptIndex] = { ...appState.appointments[apptIndex], ...updates };
        saveState();
        console.log("API: Appointment updated successfully.", appState.appointments[apptIndex]);
        resolve(appState.appointments[apptIndex]);
      } else {
        console.error(`API: Error updating appointment. ID ${apptId} not found.`);
        reject(new Error("Appointment not found"));
      }
    }, API_DELAY);
  });
}

async function apiDeleteAppointment(apptId: string): Promise<void> {
  console.log(`API: Deleting appointment ${apptId}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = appState.appointments.length;
      appState.appointments = appState.appointments.filter(a => a.id !== apptId);
      if (appState.appointments.length < initialLength) {
        saveState();
        console.log("API: Appointment deleted successfully.");
        resolve();
      } else {
        console.error(`API: Error deleting appointment. ID ${apptId} not found.`);
        reject(new Error("Appointment not found during delete"));
      }
    }, API_DELAY);
  });
}


function loadInitialState(): AppState {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.warn("No current user found. This should be handled by redirection in DOMContentLoaded.");
        // This state is temporary, redirection should occur before app uses it.
        return {
            currentUser: null,
            medications: [], familyMembers: [], appointments: [], healthRecords: [],
            currentView: 'dashboard', language: 'en', isLandingActive: true,
            isLoadingMedications: false, isLoadingFamilyMembers: false, isLoadingAppointments: false,
            editingMedicationId: null, editingFamilyMemberId: null, editingAppointmentId: null,
            notificationPermission: 'default', lastNotificationTimestamps: {}
        };
    }
    return loadStateForUser(currentUser);
}


function loadStateForUser(user: User): AppState {
  const savedStateJson = localStorage.getItem(USER_APP_STATE_PREFIX + user.id);
  const defaultUserState: Omit<AppState, 'currentUser'> = {
    medications: [],
    familyMembers: [],
    appointments: [],
    healthRecords: [],
    currentView: 'dashboard',
    language: 'en',
    isLandingActive: true,
    isLoadingMedications: false,
    isLoadingFamilyMembers: false,
    isLoadingAppointments: false,
    editingMedicationId: null,
    editingFamilyMemberId: null,
    editingAppointmentId: null,
    notificationPermission: Notification?.permission || 'default',
    lastNotificationTimestamps: {},
  };

  if (savedStateJson) {
    const parsedState = JSON.parse(savedStateJson);
    const isLandingActive = parsedState.isLandingActive === false ? false : defaultUserState.isLandingActive;

    return {
      ...defaultUserState,
      ...parsedState,
      currentUser: user,
      isLandingActive: isLandingActive,
      notificationPermission: Notification?.permission || parsedState.notificationPermission || 'default',
      lastNotificationTimestamps: parsedState.lastNotificationTimestamps || {},
      medications: (parsedState.medications || []).map((med: any) => ({ ...med, duration: med.duration || '' })),
      familyMembers: (parsedState.familyMembers || []).map((fm: any) => ({
        ...fm,
        age: fm.age || undefined,
        gender: fm.gender || undefined,
        medicalConditions: fm.medicalConditions || '',
        bloodType: fm.bloodType || '',
        allergies: fm.allergies || '',
        emergencyContacts: (fm.emergencyContacts || []).map((ec: any) => ({...ec, id: ec.id || appGenerateId()})),
        otherMedicalInfo: fm.otherMedicalInfo || '',
      })),
    };
  }
  return { ...defaultUserState, currentUser: user, isLandingActive: true };
}

function saveState() {
  if (!appState.currentUser) {
    console.error("Attempted to save state without a current user.");
    return;
  }
  const stateToSave = { ...appState };
  const {
      currentUser,
      isLoadingMedications, isLoadingFamilyMembers, isLoadingAppointments,
      editingMedicationId, editingFamilyMemberId, editingAppointmentId,
      // notificationPermission should be persisted if changed by our app,
      // but browser's Notification.permission is the source of truth for current status.
      ...persistedState
  } = stateToSave;

  localStorage.setItem(USER_APP_STATE_PREFIX + appState.currentUser.id, JSON.stringify(persistedState));
}


function t(key: keyof typeof translations.en, fallback?: string): string {
  const lang = appState?.language || 'en';
  const mainTranslations = translations[lang] as Record<string, string>;
  const fallbackTranslations = translations.en as Record<string, string>;
  return mainTranslations[key] || fallback || fallbackTranslations[key] || key;
}

function handleLogout() {
    localStorage.removeItem(APP_CURRENT_USER_STORAGE_KEY);
    window.location.href = 'login.html';
}

function renderApp() {
  if (!appState.currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const landingPage = document.getElementById('landing-page');
  const mainAppWrapper = document.getElementById('main-app-wrapper');

  if (!landingPage || !mainAppWrapper) {
    console.error("Core page elements not found!");
    return;
  }

  // Update landing page translations
  (document.getElementById('landing-app-title') as HTMLElement).textContent = t('appName');
  (document.getElementById('landing-tagline') as HTMLElement).textContent = t('landingTagline');
  (document.getElementById('enter-app-button') as HTMLElement).textContent = t('getStarted');
  (document.getElementById('features-title') as HTMLElement).textContent = t('featuresTitle');
  (document.getElementById('feature-reminders-title') as HTMLElement).textContent = t('featureRemindersTitle');
  (document.getElementById('feature-reminders-desc') as HTMLElement).textContent = t('featureRemindersDesc');
  (document.getElementById('feature-appointments-title') as HTMLElement).textContent = t('featureAppointmentsTitle');
  (document.getElementById('feature-appointments-desc') as HTMLElement).textContent = t('featureAppointmentsDesc');
  (document.getElementById('feature-records-title') as HTMLElement).textContent = t('featureRecordsTitle');
  (document.getElementById('feature-records-desc') as HTMLElement).textContent = t('featureRecordsDesc');


  if (appState.isLandingActive) {
    landingPage.style.display = 'block';
    mainAppWrapper.style.display = 'none';
    mainAppWrapper.classList.remove('visible');
    landingPage.classList.remove('hidden');
    initializeSimpleScrollAnimations();
  } else {
    landingPage.style.display = 'none';
    landingPage.classList.add('hidden');
    mainAppWrapper.style.display = 'flex';
    setTimeout(() => mainAppWrapper.classList.add('visible'), 10);


    document.title = t('appName');
    const appTitle = document.getElementById('app-title');
    if (appTitle) appTitle.textContent = t('appName');

    const currentUserDisplay = document.getElementById('current-user-display');
    if (currentUserDisplay && appState.currentUser) {
        currentUserDisplay.textContent = `${t('welcomeUser')}, ${appState.currentUser.username}!`;
    }
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) logoutButton.textContent = t('logout');


    const navButtons = document.querySelectorAll<HTMLButtonElement>('#app-nav button');
    navButtons.forEach(button => {
      const view = button.dataset.view;
      if (view) {
        button.textContent = t(`nav${view.charAt(0).toUpperCase() + view.slice(1)}` as keyof typeof translations.en);
        button.classList.toggle('active', appState.currentView === view);
      }
    });

    const langSelector = document.getElementById('language-selector') as HTMLSelectElement;
    if(langSelector) langSelector.value = appState.language;

    const content = document.getElementById('app-content');
    if (!content) return;

    content.innerHTML = ''; // Clear previous content

    // Add notification permission status to dashboard or a general settings area
    if (appState.currentView === 'dashboard') {
        renderDashboard(content); // RenderDashboard will now include notification status
    } else {
      switch (appState.currentView) {
        case 'reminders':
          renderMedicineReminders(content);
          break;
        case 'appointments':
          renderAppointmentsView(content);
          break;
        case 'records':
          renderHealthRecordsView(content);
          break;
        case 'family':
          renderFamilyMembers(content);
          break;
        case 'emergency':
          renderEmergencyView(content);
          break;
        default:
          content.innerHTML = `<p>${t('viewNotImplemented')}</p>`;
      }
    }
  }
}

function initializeSimpleScrollAnimations() {
    const animatedElements = document.querySelectorAll<HTMLElement>('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}


function showMainApp() {
  appState.isLandingActive = false;
  saveState();
  renderApp();
  requestNotificationPermission(); // Request permission when user enters main app
}

function renderDashboard(container: HTMLElement) {
    const today = new Date().toISOString().split('T')[0];

    const activeReminders = appState.medications.filter(med => !med.taken);
    const appointmentsToday = appState.appointments.filter(appt => appt.date === today && !appt.completed);

    let greetingName = appState.currentUser ? appState.currentUser.username : "";

    let notificationStatusHtml = '';
    if (appState.notificationPermission === 'granted') {
        notificationStatusHtml = `<div class="notification-status success">${t('notificationsEnabled')}</div>`;
    } else if (appState.notificationPermission === 'denied') {
        notificationStatusHtml = `<div class="notification-status error">${t('notificationsDenied')}</div>`;
    } else {
        notificationStatusHtml = `
            <div class="notification-status warning">
                ${t('notificationsDefault')}
                <button id="enable-notifications-btn" class="button-small button-primary">${t('enableNotifications')}</button>
            </div>`;
    }

    container.innerHTML = `
        <div class="dashboard-greeting">
            <h2>${t('dashboardGreeting')} ${greetingName}!</h2>
            <p>${t('dashboardMessage')}</p>
        </div>
        ${notificationStatusHtml}
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <span class="dashboard-card-icon">🕒</span>
                    <h3>${t('statReminders')}</h3>
                </div>
                <div class="dashboard-card-value">${activeReminders.length}</div>
                <p class="dashboard-card-description">${activeReminders.length > 0 ? `${activeReminders.length} ${t('upcomingReminders').toLowerCase()}` : t('noUpcomingReminders')}</p>
                 <button class="button-primary" data-view-target="reminders">${t('navReminders')}</button>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <span class="dashboard-card-icon">📅</span>
                    <h3>${t('statAppointmentsToday')}</h3>
                </div>
                <div class="dashboard-card-value">${appointmentsToday.length}</div>
                <p class="dashboard-card-description">${appointmentsToday.length > 0 ? `${appointmentsToday.length} ${t('navAppointments').toLowerCase()} ${t('appointmentDate').toLowerCase()}` : t('noAppointmentsToday')}</p>
                <button class="button-primary" data-view-target="appointments">${t('navAppointments')}</button>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <span class="dashboard-card-icon">👨‍👩‍👧‍👦</span>
                    <h3>${t('statFamilyMembers')}</h3>
                </div>
                <div class="dashboard-card-value">${appState.familyMembers.length}</div>
                <p class="dashboard-card-description">${t('manageFamily')} (${appState.familyMembers.length}).</p>
                <button class="button-primary" data-view-target="family">${t('navFamily')}</button>
            </div>
        </div>
        <div class="dashboard-quick-actions">
            <button class="button-primary" data-view-target="reminders" data-action="quickAddReminder" data-form-focus="med-name">${t('quickAddReminder')}</button>
            <button class="button-primary" data-view-target="appointments" data-action="quickAddAppointment" data-form-focus="appt-title">${t('quickAddAppointment')}</button>
        </div>
    `;
    attachDashboardActionListeners(container);
    const enableNotificationsBtn = document.getElementById('enable-notifications-btn');
    if (enableNotificationsBtn) {
        enableNotificationsBtn.addEventListener('click', requestNotificationPermission);
    }
}

function attachDashboardActionListeners(container: HTMLElement) {
    container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('button[data-view-target]');
        if (button) {
            const viewTarget = button.getAttribute('data-view-target');
            if (viewTarget) {
                appState.currentView = viewTarget;
                appState.editingMedicationId = null;
                appState.editingAppointmentId = null;
                appState.editingFamilyMemberId = null;
                // saveState(); // currentView change is saved by main nav handler
                renderApp();

                const focusFieldId = button.getAttribute('data-form-focus');
                if (focusFieldId) {
                    setTimeout(() => {
                        (document.getElementById(focusFieldId) as HTMLElement)?.focus();
                    }, 0);
                }
            }
        }
    });
}

// --- Medicine Reminders ---
async function renderMedicineReminders(container: HTMLElement) {
  const isEditing = !!appState.editingMedicationId;
  const medToEdit = isEditing ? appState.medications.find(m => m.id === appState.editingMedicationId) : null;

  const familyOptions = [
    { id: 'self', name: t('self') },
    ...appState.familyMembers
  ].map(member => `<option value="${member.id}" ${medToEdit?.assignedTo === member.id ? 'selected' : ''}>${member.name}</option>`).join('');

  container.innerHTML = `
    <div class="feature-container card">
      <h2>${isEditing ? t('editReminder') : t('addReminder')}</h2>
      <form id="medication-form" class="medminder-form">
        <input type="hidden" id="med-id" value="${medToEdit?.id || ''}">
        <div>
          <label for="med-name">${t('medicationName')}:</label>
          <input type="text" id="med-name" value="${medToEdit?.name || ''}" required>
        </div>
        <div>
          <label for="med-dosage">${t('dosage')}:</label>
          <input type="text" id="med-dosage" value="${medToEdit?.dosage || ''}" required>
        </div>
        <div>
          <label for="med-frequency">${t('frequency')}:</label>
          <input type="text" id="med-frequency" value="${medToEdit?.frequency || ''}" required>
        </div>
        <div>
          <label for="med-time">${t('time')}:</label>
          <input type="time" id="med-time" value="${medToEdit?.time || ''}" required>
        </div>
        <div>
          <label for="med-duration">${t('duration')}:</label>
          <input type="text" id="med-duration" value="${medToEdit?.duration || ''}">
        </div>
        <div>
          <label for="med-assignedTo">${t('assignedTo')}:</label>
          <select id="med-assignedTo" required>
            ${familyOptions.length > 0 || appState.familyMembers.length === 0 ? familyOptions : `<option value="" disabled>${t('selectMember')}</option>`}
          </select>
        </div>
        <button type="submit" class="button-primary">${isEditing ? t('updateReminder') : t('addReminder')}</button>
        ${isEditing ? `<button type="button" id="cancel-edit-med" class="button-secondary">${t('cancel')}</button>` : ''}
      </form>
      <div id="medication-list-container" class="list-container">
        <h3>${t('upcomingReminders')}</h3>
        <ul id="medication-list" class="item-list"></ul>
      </div>
    </div>
  `;
  attachMedicationFormListener();

  if (isEditing && document.getElementById('cancel-edit-med')) {
    document.getElementById('cancel-edit-med')?.addEventListener('click', () => {
      appState.editingMedicationId = null;
      saveState();
      renderMedicineReminders(container); // Re-render current view without edit mode
    });
  }

  try {
    const fetchedMeds = await apiFetchMedications();
    appState.medications = fetchedMeds;
  } catch (error) {
    console.error("Failed to fetch medications:", error);
    const listElement = document.getElementById('medication-list');
    if (listElement) listElement.innerHTML = `<li class="list-item-empty">${t('errorAPI')}</li>`;
  } finally {
    appState.isLoadingMedications = false;
    renderMedicationList();
  }
}

function attachMedicationFormListener() {
    const form = document.getElementById('medication-form') as HTMLFormElement;
    const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (form && submitButton) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const medId = (document.getElementById('med-id') as HTMLInputElement).value;
            const isEditing = !!medId;

            const medData = {
                name: (document.getElementById('med-name') as HTMLInputElement).value,
                dosage: (document.getElementById('med-dosage') as HTMLInputElement).value,
                frequency: (document.getElementById('med-frequency') as HTMLInputElement).value,
                time: (document.getElementById('med-time') as HTMLInputElement).value,
                duration: (document.getElementById('med-duration') as HTMLInputElement).value,
                assignedTo: (document.getElementById('med-assignedTo') as HTMLSelectElement).value || 'self',
            };

            setLoadingState(submitButton, true, isEditing ? 'updateReminder' : 'addReminder', 'saving');
            try {
                if (isEditing) {
                    await apiUpdateMedication(medId, medData);
                } else {
                    await apiAddMedication(medData);
                }
                appState.editingMedicationId = null;
                saveState();
                renderMedicationList();
                if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
                form.reset();
                (document.getElementById('med-id') as HTMLInputElement).value = '';
                if (isEditing) { // Reset form title and button text after edit
                    (form.parentElement?.querySelector('h2') as HTMLElement).textContent = t('addReminder');
                    submitButton.textContent = t('addReminder');
                    document.getElementById('cancel-edit-med')?.remove();
                }
            } catch (error) {
                console.error("Error saving medication:", error);
                alert(t('errorAPI'));
            } finally {
                setLoadingState(submitButton, false, appState.editingMedicationId ? 'updateReminder' : 'addReminder', 'saving');
                 if(isEditing && !appState.editingMedicationId) { // If was editing, but now finished, revert button
                     setLoadingState(submitButton, false, 'addReminder', 'saving');
                 }
            }
        });
    }
}

function renderMedicationList() {
  const listElement = document.getElementById('medication-list');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (appState.isLoadingMedications) {
    listElement.innerHTML = `<li class="list-item-empty">${t('loadingMedications')}</li>`;
    return;
  }

  if (appState.medications.length === 0) {
    listElement.innerHTML = `<li class="list-item-empty">${t('noReminders')}</li>`;
    return;
  }

  const sortedMedications = [...appState.medications].sort((a,b) => {
      if (a.taken === b.taken) return a.time.localeCompare(b.time);
      return a.taken ? 1 : -1;
  });

  sortedMedications.forEach(med => {
    const assignedToMember = appState.familyMembers.find(fm => fm.id === med.assignedTo) || {name: t('self')};
    const listItem = document.createElement('li');
    listItem.className = `list-item medication-item ${med.taken ? 'taken' : ''}`;
    listItem.setAttribute('aria-label', `${med.name} for ${assignedToMember.name}`);

    listItem.innerHTML = `
      <div class="item-info med-info">
        <strong>${med.name}</strong> (${med.dosage}) - ${med.frequency} at ${med.time}
        ${med.duration ? `<br><small>${t('duration')}: ${med.duration}</small>` : ''}
        <br><em>${t('assignedTo')}: ${assignedToMember.name}</em>
      </div>
      <div class="item-actions med-actions">
        <button class="button-small button-edit" data-id="${med.id}" data-action="editMedication" aria-label="${t('edit')} ${med.name}">${t('edit')}</button>
        <button class="button-small ${med.taken ? 'button-secondary' : 'button-success'}" data-id="${med.id}" data-action="toggleTaken" aria-pressed="${med.taken ? 'true' : 'false'}">
            ${med.taken ? t('undo') : t('taken')}
        </button>
        <button class="button-small button-danger" data-id="${med.id}" data-action="deleteMedication" aria-label="${t('delete')} ${med.name}">${t('delete')}</button>
      </div>
    `;
    listElement.appendChild(listItem);
  });
  attachMedicationActionListeners();
}

function attachMedicationActionListeners() {
    const listElement = document.getElementById('medication-list');
    if (listElement) {
        listElement.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button');
            if (!button) return;

            const id = button.dataset.id;
            const action = button.dataset.action;
            if (!id) return;

            if (action === 'editMedication') {
                appState.editingMedicationId = id;
                saveState();
                renderMedicineReminders(document.getElementById('app-content') as HTMLElement);
                document.getElementById('med-name')?.focus();
            } else if (action === 'toggleTaken') {
                const med = appState.medications.find(m => m.id === id);
                if (!med) return;
                setLoadingState(button, true, med.taken ? 'undo' : 'taken', 'saving');
                try {
                    await apiUpdateMedication(id, { taken: !med.taken });
                    renderMedicationList();
                    if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
                } catch (error) {
                    console.error("Error toggling medication state:", error);
                    alert(t('errorAPI'));
                    renderMedicationList();
                }
            } else if (action === 'deleteMedication') {
                setLoadingState(button, true, 'delete', 'deleting');
                try {
                    await apiDeleteMedication(id);
                    renderMedicationList();
                    if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
                } catch (error) {
                    console.error("Error deleting medication:", error);
                    alert(t('errorAPI'));
                     renderMedicationList();
                }
            }
        });
    }
}

// --- Appointments ---
async function renderAppointmentsView(container: HTMLElement) {
  const isEditing = !!appState.editingAppointmentId;
  const apptToEdit = isEditing ? appState.appointments.find(a => a.id === appState.editingAppointmentId) : null;

  const familyOptions = [
    { id: 'self', name: t('self') },
    ...appState.familyMembers
  ].map(member => `<option value="${member.id}" ${apptToEdit?.assignedTo === member.id ? 'selected' : ''}>${member.name}</option>`).join('');

  container.innerHTML = `
    <div class="feature-container card">
      <h2>${isEditing ? t('editAppointment') : t('addAppointment')}</h2>
      <form id="appointment-form" class="medminder-form">
        <input type="hidden" id="appt-id" value="${apptToEdit?.id || ''}">
        <div>
          <label for="appt-title">${t('appointmentTitle')}:</label>
          <input type="text" id="appt-title" value="${apptToEdit?.title || ''}" required>
        </div>
        <div>
          <label for="appt-description">${t('appointmentDescription')}:</label>
          <textarea id="appt-description">${apptToEdit?.description || ''}</textarea>
        </div>
        <div>
          <label for="appt-date">${t('appointmentDate')}:</label>
          <input type="date" id="appt-date" value="${apptToEdit?.date || ''}" required>
        </div>
        <div>
          <label for="appt-time">${t('appointmentTime')}:</label>
          <input type="time" id="appt-time" value="${apptToEdit?.time || ''}" required>
        </div>
        <div>
          <label for="appt-location">${t('appointmentLocation')}:</label>
          <input type="text" id="appt-location" value="${apptToEdit?.location || ''}">
        </div>
        <div>
          <label for="appt-assignedTo">${t('assignedTo')}:</label>
          <select id="appt-assignedTo" required>
            ${familyOptions.length > 0 || appState.familyMembers.length === 0 ? familyOptions : `<option value="" disabled>${t('selectMember')}</option>`}
          </select>
        </div>
        <div>
          <label for="appt-notes">${t('appointmentNotes')}:</label>
          <textarea id="appt-notes">${apptToEdit?.notes || ''}</textarea>
        </div>
        <button type="submit" class="button-primary">${isEditing ? t('updateAppointment') : t('addAppointment')}</button>
        ${isEditing ? `<button type="button" id="cancel-edit-appt" class="button-secondary">${t('cancel')}</button>` : ''}
      </form>
      <div id="appointment-list-container" class="list-container">
        <h3>${t('upcomingAppointments')}</h3>
        <ul id="appointment-list" class="item-list"></ul>
      </div>
    </div>
  `;
  attachAppointmentFormListener();

  if (isEditing && document.getElementById('cancel-edit-appt')) {
    document.getElementById('cancel-edit-appt')?.addEventListener('click', () => {
      appState.editingAppointmentId = null;
      saveState();
      renderAppointmentsView(container);
    });
  }

  try {
    const fetchedAppts = await apiFetchAppointments();
    appState.appointments = fetchedAppts;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    const listElement = document.getElementById('appointment-list');
    if (listElement) listElement.innerHTML = `<li class="list-item-empty">${t('errorAPI')}</li>`;
  } finally {
    appState.isLoadingAppointments = false;
    renderAppointmentList();
  }
}

function attachAppointmentFormListener() {
  const form = document.getElementById('appointment-form') as HTMLFormElement;
  const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement;

  if (form && submitButton) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const apptId = (document.getElementById('appt-id') as HTMLInputElement).value;
      const isEditing = !!apptId;

      const apptData = {
        title: (document.getElementById('appt-title') as HTMLInputElement).value,
        description: (document.getElementById('appt-description') as HTMLTextAreaElement).value,
        date: (document.getElementById('appt-date') as HTMLInputElement).value,
        time: (document.getElementById('appt-time') as HTMLInputElement).value,
        location: (document.getElementById('appt-location') as HTMLInputElement).value,
        assignedTo: (document.getElementById('appt-assignedTo') as HTMLSelectElement).value || 'self',
        notes: (document.getElementById('appt-notes') as HTMLTextAreaElement).value,
      };

      setLoadingState(submitButton, true, isEditing ? 'updateAppointment' : 'addAppointment', 'saving');
      try {
        if (isEditing) {
          await apiUpdateAppointment(apptId, apptData);
        } else {
          await apiAddAppointment(apptData as Omit<Appointment, 'id' | 'completed'>);
        }
        appState.editingAppointmentId = null;
        saveState();
        renderAppointmentList();
        if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
        form.reset();
        (document.getElementById('appt-id') as HTMLInputElement).value = '';
        if (isEditing) {
            (form.parentElement?.querySelector('h2') as HTMLElement).textContent = t('addAppointment');
            submitButton.textContent = t('addAppointment');
            document.getElementById('cancel-edit-appt')?.remove();
        }
      } catch (error) {
        console.error("Error saving appointment:", error);
        alert(t('errorAPI'));
      } finally {
        setLoadingState(submitButton, false, appState.editingAppointmentId ? 'updateAppointment' : 'addAppointment', 'saving');
        if(isEditing && !appState.editingAppointmentId) {
            setLoadingState(submitButton, false, 'addAppointment', 'saving');
        }
      }
    });
  }
}

function renderAppointmentList() {
  const listElement = document.getElementById('appointment-list');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (appState.isLoadingAppointments) {
    listElement.innerHTML = `<li class="list-item-empty">${t('loadingAppointments')}</li>`;
    return;
  }
  if (appState.appointments.length === 0) {
    listElement.innerHTML = `<li class="list-item-empty">${t('noAppointments')}</li>`;
    return;
  }

  const sortedAppointments = [...appState.appointments].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    if (a.completed === b.completed) return dateTimeA.getTime() - dateTimeB.getTime();
    return a.completed ? 1 : -1;
  });

  sortedAppointments.forEach(appt => {
    const assignedToMember = appState.familyMembers.find(fm => fm.id === appt.assignedTo) || { name: t('self') };
    const listItem = document.createElement('li');
    listItem.className = `list-item appointment-item ${appt.completed ? 'completed' : ''}`;
    listItem.setAttribute('aria-label', `${appt.title} for ${assignedToMember.name} on ${appt.date}`);

    let details = `<strong>${appt.title}</strong>`;
    if (appt.date && appt.time) {
        details += ` - ${new Date(appt.date).toLocaleDateString(appState.language, { year: 'numeric', month: 'long', day: 'numeric' })} at ${appt.time}`;
    } else if (appt.date) {
        details += ` - ${new Date(appt.date).toLocaleDateString(appState.language, { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }

    if (appt.description) details += `<br><small><em>${appt.description}</em></small>`;
    if (appt.location) details += `<br><small>${t('appointmentLocation')}: ${appt.location}</small>`;

    listItem.innerHTML = `
      <div class="item-info appt-info">
        ${details}
        <br><em>${t('assignedTo')}: ${assignedToMember.name}</em>
        ${appt.notes ? `<br><small class="notes">${t('appointmentNotes')}: ${appt.notes}</small>` : ''}
      </div>
      <div class="item-actions appt-actions">
        <button class="button-small button-edit" data-id="${appt.id}" data-action="editAppointment" aria-label="${t('edit')} ${appt.title}">${t('edit')}</button>
        <button class="button-small ${appt.completed ? 'button-secondary' : 'button-success'}" data-id="${appt.id}" data-action="toggleCompleted" aria-pressed="${appt.completed ? 'true' : 'false'}">
          ${appt.completed ? t('undo') : t('markCompleted')}
        </button>
        <button class="button-small button-danger" data-id="${appt.id}" data-action="deleteAppointment" aria-label="${t('delete')} ${appt.title}">${t('delete')}</button>
      </div>
    `;
    listElement.appendChild(listItem);
  });
  attachAppointmentActionListeners();
}

function attachAppointmentActionListeners() {
  const listElement = document.getElementById('appointment-list');
  if (listElement) {
    listElement.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      if (!button) return;

      const id = button.dataset.id;
      const action = button.dataset.action;
      if (!id) return;

      if (action === 'editAppointment') {
          appState.editingAppointmentId = id;
          saveState();
          renderAppointmentsView(document.getElementById('app-content') as HTMLElement);
          document.getElementById('appt-title')?.focus();
      } else if (action === 'toggleCompleted') {
        const appt = appState.appointments.find(a => a.id === id);
        if (!appt) return;
        setLoadingState(button, true, appt.completed ? 'undo' : 'markCompleted', 'saving');
        try {
            await apiUpdateAppointment(id, { completed: !appt.completed });
            renderAppointmentList();
            if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
        } catch (error) {
            console.error("Error toggling appointment state:", error);
            alert(t('errorAPI'));
            renderAppointmentList();
        }
      } else if (action === 'deleteAppointment') {
        setLoadingState(button, true, 'delete', 'deleting');
        try {
            await apiDeleteAppointment(id);
            renderAppointmentList();
            if (appState.currentView === 'dashboard') renderDashboard(document.getElementById('app-content') as HTMLElement);
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert(t('errorAPI'));
            renderAppointmentList();
        }
      }
    });
  }
}

// --- Health Records ---
function renderHealthRecordsView(container: HTMLElement) {
  const familyOptions = [
    { id: 'self', name: t('self') },
    ...appState.familyMembers
  ].map(member => `<option value="${member.id}">${member.name}</option>`).join('');

  const recordTypeOptions = [
    { value: 'prescription', label: t('recordTypePrescription') },
    { value: 'lab_report', label: t('recordTypeLabReport') },
    { value: 'scan_imaging', label: t('recordTypeScan') },
    { value: 'vaccination', label: t('recordTypeVaccination') },
    { value: 'other', label: t('recordTypeOther') },
  ].map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');

  container.innerHTML = `
    <div class="feature-container card">
      <h2>${t('navRecords')}</h2>
      <form id="record-form" class="medminder-form">
        <h3>${t('addRecord')}</h3>
        <div>
          <label for="record-title">${t('recordTitle')}:</label>
          <input type="text" id="record-title" required>
        </div>
        <div>
          <label for="record-type">${t('recordType')}:</label>
          <select id="record-type" required>
            ${recordTypeOptions}
          </select>
        </div>
         <div>
          <label for="record-date">${t('recordDate')}:</label>
          <input type="date" id="record-date" required>
        </div>
        <div>
          <label for="record-assignedTo">${t('assignedTo')}:</label>
          <select id="record-assignedTo" required>
            ${familyOptions.length > 0 || appState.familyMembers.length === 0 ? familyOptions : `<option value="" disabled>${t('selectMember')}</option>`}
          </select>
        </div>
        <div>
          <label for="record-file">${t('recordFile')}:</label>
          <input type="file" id="record-file" accept="image/*,application/pdf" required>
        </div>
        <div>
          <label for="record-notes">${t('recordNotes')}:</label>
          <textarea id="record-notes"></textarea>
        </div>
        <button type="submit" class="button-primary">${t('add')}</button>
      </form>
      <div id="record-list-container" class="list-container">
        <h3>${t('uploadedRecords')}</h3>
        <ul id="record-list" class="item-list"></ul>
      </div>
    </div>
  `;
  renderHealthRecordList();
  attachRecordFormListener();
}

function attachRecordFormListener() {
  const form = document.getElementById('record-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('record-file') as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (!file) {
        alert("Please select a file to upload.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(t('errorFileSizeTooLarge'));
        fileInput.value = ''; // Reset file input
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      setLoadingState(submitButton, true, 'add', 'saving');

      try {
        const fileDataUrl = await readFileAsDataURL(file);
        const newRecord: HealthRecord = {
          id: appGenerateId(),
          title: (document.getElementById('record-title') as HTMLInputElement).value,
          recordType: (document.getElementById('record-type') as HTMLSelectElement).value,
          date: (document.getElementById('record-date') as HTMLInputElement).value,
          assignedTo: (document.getElementById('record-assignedTo') as HTMLSelectElement).value || 'self',
          fileName: file.name,
          fileDataUrl: fileDataUrl,
          fileType: file.type,
          notes: (document.getElementById('record-notes') as HTMLTextAreaElement).value,
        };
        appState.healthRecords.push(newRecord);
        saveState();
        renderHealthRecordList();
        (form as HTMLFormElement).reset();
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Error uploading file. Please try again.");
      } finally {
        setLoadingState(submitButton, false, 'add', 'saving');
      }
    });
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderHealthRecordList() {
  const listElement = document.getElementById('record-list');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (appState.healthRecords.length === 0) {
    listElement.innerHTML = `<li class="list-item-empty">${t('noRecords')}</li>`;
    return;
  }

  const sortedRecords = [...appState.healthRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  sortedRecords.forEach(record => {
    const assignedToMember = appState.familyMembers.find(fm => fm.id === record.assignedTo) || { name: t('self') };
    const recordTypeKey = `recordType${record.recordType.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}` as keyof typeof translations.en;
    const recordTypeDisplay = t(recordTypeKey, record.recordType);

    const listItem = document.createElement('li');
    listItem.className = 'list-item record-item';
    listItem.setAttribute('aria-label', `${record.title} (${recordTypeDisplay}) for ${assignedToMember.name}`);

    listItem.innerHTML = `
      <div class="item-info record-info">
        <strong>${record.title}</strong> (${recordTypeDisplay})
        <br><small>${t('recordDate')}: ${new Date(record.date).toLocaleDateString(appState.language, { year: 'numeric', month: 'long', day: 'numeric' })}</small>
        <br><small>${t('fileName')}: ${record.fileName} (${(record.fileType || "N/A")})</small>
        <br><em>${t('assignedTo')}: ${assignedToMember.name}</em>
        ${record.notes ? `<br><small class="notes">${t('recordNotes')}: ${record.notes}</small>` : ''}
      </div>
      <div class="item-actions record-actions">
        <button class="button-small button-success" data-id="${record.id}" data-action="viewDownloadRecord" aria-label="${t('viewDownload')} ${record.title}">${t('viewDownload')}</button>
        <button class="button-small button-danger" data-id="${record.id}" data-action="deleteRecord" aria-label="${t('delete')} ${record.title}">${t('delete')}</button>
      </div>
    `;
    listElement.appendChild(listItem);
  });
  attachRecordActionListeners();
}

function attachRecordActionListeners() {
  const listElement = document.getElementById('record-list');
  if (listElement) {
    listElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      if (!button) return;

      const id = button.dataset.id;
      const action = button.dataset.action;
      const record = appState.healthRecords.find(r => r.id === id);

      if (record && action === 'viewDownloadRecord') {
        const link = document.createElement('a');
        link.href = record.fileDataUrl;
        link.target = '_blank';
        link.download = record.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (id && action === 'deleteRecord') {
        appState.healthRecords = appState.healthRecords.filter(r => r.id !== id);
        saveState();
        renderHealthRecordList();
      }
    });
  }
}

// --- Family Members ---
async function renderFamilyMembers(container: HTMLElement) {
  const isEditing = !!appState.editingFamilyMemberId;
  const memberToEdit = isEditing ? appState.familyMembers.find(m => m.id === appState.editingFamilyMemberId) : null;

  const genderOptions = [
    { value: '', label: t('selectGender') },
    { value: 'male', label: t('genderMale') },
    { value: 'female', label: t('genderFemale') },
    { value: 'other', label: t('genderOther') },
    { value: 'prefer_not_to_say', label: t('genderPreferNotToSay') },
  ].map(opt => `<option value="${opt.value}" ${memberToEdit?.gender === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('');

  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown', ''].map(type =>
    `<option value="${type}" ${memberToEdit?.bloodType === type ? 'selected' : ''}>${type || t('selectBloodType')}</option>`
  ).join('');

  let emergencyContactsHtml = (memberToEdit?.emergencyContacts || []).map((contact, index) =>
    renderEmergencyContactFields(contact, index)
  ).join('');


  container.innerHTML = `
    <div class="feature-container card">
      <h2>${isEditing ? t('editMember') : t('addMember')}</h2>
      <form id="family-form" class="medminder-form">
        <input type="hidden" id="family-member-id" value="${memberToEdit?.id || ''}">
        <div>
          <label for="member-name">${t('memberName')}:</label>
          <input type="text" id="member-name" value="${memberToEdit?.name || ''}" required>
        </div>
        <div>
          <label for="member-age">${t('age')}:</label>
          <input type="number" id="member-age" value="${memberToEdit?.age || ''}" min="0">
        </div>
        <div>
          <label for="member-gender">${t('gender')}:</label>
          <select id="member-gender">${genderOptions}</select>
        </div>
        <div>
          <label for="member-conditions">${t('medicalConditions')}:</label>
          <textarea id="member-conditions">${memberToEdit?.medicalConditions || ''}</textarea>
        </div>
        <hr>
        <h4>${t('emergencyInformation')}</h4>
        <div>
          <label for="member-blood-type">${t('bloodType')}:</label>
          <select id="member-blood-type">${bloodTypeOptions}</select>
        </div>
        <div>
          <label for="member-allergies">${t('allergies')}:</label>
          <textarea id="member-allergies">${memberToEdit?.allergies || ''}</textarea>
        </div>
        <div>
          <label for="member-other-medical-info">${t('otherMedicalInfo')}:</label>
          <textarea id="member-other-medical-info">${memberToEdit?.otherMedicalInfo || ''}</textarea>
        </div>
        <div id="emergency-contacts-container">
          <label>${t('emergencyContacts')}:</label>
          ${emergencyContactsHtml}
        </div>
        <button type="button" id="add-emergency-contact-btn" class="button-secondary button-small">${t('addEmergencyContact')}</button>
        <hr>
        <button type="submit" class="button-primary">${isEditing ? t('updateMember') : t('addMember')}</button>
        ${isEditing ? `<button type="button" id="cancel-edit-family" class="button-secondary">${t('cancel')}</button>` : ''}
      </form>
      <div id="family-list-container" class="list-container">
        <ul id="family-list" class="item-list family-list"></ul>
      </div>
    </div>
  `;
  attachFamilyFormListener();

  if (isEditing && document.getElementById('cancel-edit-family')) {
    document.getElementById('cancel-edit-family')?.addEventListener('click', () => {
      appState.editingFamilyMemberId = null;
      saveState();
      renderFamilyMembers(container);
    });
  }

  try {
    const fetchedFamily = await apiFetchFamilyMembers();
    appState.familyMembers = fetchedFamily;
  } catch (error) {
    console.error("Failed to fetch family members:", error);
    const listElement = document.getElementById('family-list');
    if (listElement) listElement.innerHTML = `<li class="list-item-empty">${t('errorAPI')}</li>`;
  } finally {
    appState.isLoadingFamilyMembers = false;
    renderFamilyList();
  }
}

function renderEmergencyContactFields(contact?: EmergencyContact, index?: number): string {
    const contactId = contact?.id || appGenerateId();
    const name = contact?.name || '';
    const phone = contact?.phone || '';
    const relationship = contact?.relationship || '';
    const uniqueHtmlIdSuffix = contact?.id ? contact.id : `new-${index}`;

    return `
    <div class="emergency-contact-group" data-contact-id="${contactId}">
      <input type="hidden" class="contact-id-hidden" value="${contactId}">
      <div>
        <label for="contact-name-${uniqueHtmlIdSuffix}">${t('contactName')}:</label>
        <input type="text" id="contact-name-${uniqueHtmlIdSuffix}" class="contact-name" value="${name}" required>
      </div>
      <div>
        <label for="contact-phone-${uniqueHtmlIdSuffix}">${t('contactPhone')}:</label>
        <input type="tel" id="contact-phone-${uniqueHtmlIdSuffix}" class="contact-phone" value="${phone}" required>
      </div>
      <div>
        <label for="contact-relationship-${uniqueHtmlIdSuffix}">${t('contactRelationship')}:</label>
        <input type="text" id="contact-relationship-${uniqueHtmlIdSuffix}" class="contact-relationship" value="${relationship}" required>
      </div>
      <button type="button" class="remove-emergency-contact-btn button-danger button-small">${t('removeContact')}</button>
    </div>
  `;
}

function attachFamilyFormListener() {
    const form = document.getElementById('family-form') as HTMLFormElement;
    const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
    const addContactBtn = document.getElementById('add-emergency-contact-btn');
    const contactsContainer = document.getElementById('emergency-contacts-container');

    if (addContactBtn && contactsContainer) {
        addContactBtn.addEventListener('click', () => {
            const newContactIndex = contactsContainer.querySelectorAll('.emergency-contact-group').length;
            const newContactHtml = renderEmergencyContactFields(undefined, newContactIndex);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newContactHtml;
            contactsContainer.appendChild(tempDiv.firstChild as Node);
        });

        contactsContainer.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('remove-emergency-contact-btn')) {
                target.closest('.emergency-contact-group')?.remove();
            }
        });
    }

    if (form && submitButton) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const memberId = (document.getElementById('family-member-id') as HTMLInputElement).value;
            const isEditing = !!memberId;

            const emergencyContacts: EmergencyContact[] = [];
            document.querySelectorAll('#emergency-contacts-container .emergency-contact-group').forEach(group => {
                const idInput = group.querySelector('.contact-id-hidden') as HTMLInputElement;
                const id = idInput ? idInput.value : appGenerateId();
                const name = (group.querySelector('.contact-name') as HTMLInputElement).value;
                const phone = (group.querySelector('.contact-phone') as HTMLInputElement).value;
                const relationship = (group.querySelector('.contact-relationship') as HTMLInputElement).value;
                if (name && phone && relationship) {
                    emergencyContacts.push({ id, name, phone, relationship });
                }
            });

            const memberData: Omit<FamilyMember, 'id'> = {
                name: (document.getElementById('member-name') as HTMLInputElement).value,
                age: parseInt((document.getElementById('member-age') as HTMLInputElement).value) || undefined,
                gender: (document.getElementById('member-gender') as HTMLSelectElement).value as FamilyMember['gender'] || undefined,
                medicalConditions: (document.getElementById('member-conditions') as HTMLTextAreaElement).value,
                bloodType: (document.getElementById('member-blood-type') as HTMLSelectElement).value as FamilyMember['bloodType'] || undefined,
                allergies: (document.getElementById('member-allergies') as HTMLTextAreaElement).value,
                otherMedicalInfo: (document.getElementById('member-other-medical-info') as HTMLTextAreaElement).value,
                emergencyContacts: emergencyContacts,
            };

            setLoadingState(submitButton, true, isEditing ? 'updateMember' : 'addMember', 'saving');
            try {
                if (isEditing) {
                    await apiUpdateFamilyMember(memberId, memberData);
                } else {
                    await apiAddFamilyMember(memberData);
                }
                appState.editingFamilyMemberId = null;
                saveState();
                renderFamilyList();
                if (['reminders', 'appointments', 'records', 'emergency', 'dashboard'].includes(appState.currentView)) {
                    renderApp(); // Re-render whole app if other views might be affected by family member change
                }
                form.reset();
                (document.getElementById('family-member-id') as HTMLInputElement).value = '';
                (document.getElementById('emergency-contacts-container') as HTMLElement).innerHTML = `<label>${t('emergencyContacts')}:</label>`; // Reset contacts area

                if (isEditing) {
                    (form.parentElement?.querySelector('h2') as HTMLElement).textContent = t('addMember');
                    submitButton.textContent = t('addMember');
                     document.getElementById('cancel-edit-family')?.remove();
                }

            } catch (error) {
                console.error("Error saving family member:", error);
                alert(t('errorAPI'));
            } finally {
                 setLoadingState(submitButton, false, appState.editingFamilyMemberId ? 'updateMember' : 'addMember', 'saving');
                 if(isEditing && !appState.editingFamilyMemberId) {
                     setLoadingState(submitButton, false, 'addMember', 'saving');
                 }
            }
        });
    }
}

function renderFamilyList() {
  const listElement = document.getElementById('family-list');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (appState.isLoadingFamilyMembers) {
    listElement.innerHTML = `<li class="list-item-empty">${t('loadingFamilyMembers')}</li>`;
    return;
  }
  if (appState.familyMembers.length === 0) {
    listElement.innerHTML = `<li class="list-item-empty">${t('noFamilyMembers')}</li>`;
    return;
  }

  appState.familyMembers.forEach(member => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item family-member-item';
    listItem.setAttribute('aria-label', member.name);

    let memberDetails = `<strong>${member.name}</strong>`;
    if (member.age !== undefined) memberDetails += `<br><small>${t('age')}: ${member.age}</small>`;
    if (member.gender && member.gender !== 'prefer_not_to_say') {
        const genderKey = `gender${member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}` as keyof typeof translations.en;
        memberDetails += `<br><small>${t('gender')}: ${t(genderKey, member.gender)}</small>`;
    } else if (member.gender === 'prefer_not_to_say') {
         memberDetails += `<br><small>${t('gender')}: ${t('genderPreferNotToSay')}</small>`;
    }
    if (member.medicalConditions) memberDetails += `<br><small class="notes">${t('medicalConditions')}: ${member.medicalConditions}</small>`;
    
    if (member.bloodType && member.bloodType !== 'Unknown') {
         memberDetails += `<br><small>${t('bloodType')}: ${member.bloodType}</small>`;
    } else if (member.bloodType === 'Unknown') {
        memberDetails += `<br><small>${t('bloodType')}: ${t('bloodTypeUnknown')}</small>`;
    }

    if (member.allergies) memberDetails += `<br><small class="notes">${t('allergies')}: ${member.allergies}</small>`;
    if (member.otherMedicalInfo) memberDetails += `<br><small class="notes">${t('otherMedicalInfo')}: ${member.otherMedicalInfo}</small>`;

    if (member.emergencyContacts && member.emergencyContacts.length > 0) {
        memberDetails += `<br><small><strong>${t('emergencyContacts')}:</strong></small>`;
        member.emergencyContacts.forEach(contact => {
            memberDetails += `<br><small class="notes sub-note">&bull; ${contact.name} (${contact.relationship}): ${contact.phone}</small>`;
        });
    }

    listItem.innerHTML = `
      <div class="item-info family-info">
        ${memberDetails}
      </div>
      <div class="item-actions family-actions">
        <button class="button-small button-edit" data-id="${member.id}" data-action="editFamilyMember" aria-label="${t('edit')} ${member.name}">${t('edit')}</button>
        <button class="button-small button-danger" data-id="${member.id}" data-action="deleteFamilyMember" aria-label="${t('delete')} ${member.name}">${t('delete')}</button>
      </div>
    `;
    listElement.appendChild(listItem);
  });
  attachFamilyActionListeners();
}

function attachFamilyActionListeners() {
    const listElement = document.getElementById('family-list');
    if (listElement) {
        listElement.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            const button = target.closest('button');
            if (!button) return;

            const id = button.dataset.id;
            const action = button.dataset.action;
            if (!id) return;

            if (action === 'editFamilyMember') {
                appState.editingFamilyMemberId = id;
                saveState();
                renderFamilyMembers(document.getElementById('app-content') as HTMLElement);
                document.getElementById('member-name')?.focus();
            } else if (action === 'deleteFamilyMember') {
                setLoadingState(button, true, 'delete', 'deleting');
                try {
                    await apiDeleteFamilyMember(id);
                    renderFamilyList();
                    if (['reminders', 'appointments', 'records', 'emergency', 'dashboard'].includes(appState.currentView)) {
                         renderApp();
                    }
                } catch (error) {
                    console.error("Error deleting family member:", error);
                    alert(t('errorAPI'));
                    renderFamilyList();
                }
            }
        });
    }
}

// --- Emergency View ---
async function renderEmergencyView(container: HTMLElement) {
    container.innerHTML = `<div class="feature-container card"><h2>${t('emergencyInformation')}</h2><div id="emergency-details-list"></div></div>`;
    const listContainer = document.getElementById('emergency-details-list') as HTMLElement;
    listContainer.innerHTML = `<p>${t('loadingFamilyMembers')}</p>`;

    try {
        const familyMembers = await apiFetchFamilyMembers();
        appState.familyMembers = familyMembers;

        if (familyMembers.length === 0) {
            listContainer.innerHTML = `<p class="list-item-empty">${t('noFamilyForEmergency')}</p>`;
            return;
        }

        let contentHtml = '';
        familyMembers.forEach(member => {
            contentHtml += `<div class="emergency-member-card">`;
            contentHtml += `<h3>${member.name}</h3>`;
            let detailsExist = false;

            if (member.bloodType && member.bloodType !== 'Unknown') {
                contentHtml += `<p><strong>${t('bloodType')}:</strong> ${member.bloodType}</p>`;
                detailsExist = true;
            } else if (member.bloodType === 'Unknown') {
                 contentHtml += `<p><strong>${t('bloodType')}:</strong> ${t('bloodTypeUnknown')}</p>`;
                detailsExist = true;
            }

            if (member.allergies) {
                contentHtml += `<p><strong>${t('allergies')}:</strong> ${member.allergies.replace(/\n/g, '<br>')}</p>`;
                detailsExist = true;
            }
            if (member.medicalConditions) {
                contentHtml += `<p><strong>${t('medicalConditions')}:</strong> ${member.medicalConditions.replace(/\n/g, '<br>')}</p>`;
                detailsExist = true;
            }
             if (member.otherMedicalInfo) {
                contentHtml += `<p><strong>${t('otherMedicalInfo')}:</strong> ${member.otherMedicalInfo.replace(/\n/g, '<br>')}</p>`;
                detailsExist = true;
            }

            if (member.emergencyContacts && member.emergencyContacts.length > 0) {
                contentHtml += `<p><strong>${t('emergencyContacts')}:</strong></p><ul>`;
                member.emergencyContacts.forEach(contact => {
                    contentHtml += `<li>${contact.name} (${contact.relationship}): ${contact.phone}</li>`;
                });
                contentHtml += `</ul>`;
                detailsExist = true;
            }

            if (!detailsExist) {
                contentHtml += `<p><em>${t('noEmergencyInfo')}</em></p>`;
            }
            contentHtml += `<button class="button-small button-edit-details" data-member-id="${member.id}">${t('viewFullDetailsInFamily')}</button>`;
            contentHtml += `</div>`;
        });
        listContainer.innerHTML = contentHtml;
        attachEmergencyViewActionListeners(listContainer);

    } catch (error) {
        console.error("Error fetching family for emergency view:", error);
        listContainer.innerHTML = `<p class="list-item-empty">${t('errorAPI')}</p>`;
    }
}

function attachEmergencyViewActionListeners(container: HTMLElement) {
    container.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('.button-edit-details');
        if (button) {
            const memberId = button.getAttribute('data-member-id');
            if (memberId) {
                appState.currentView = 'family';
                appState.editingFamilyMemberId = memberId;
                saveState();
                renderApp();
                 setTimeout(() => document.getElementById('member-name')?.focus(), 0);
            }
        }
    });
}

// --- Notification System ---
let notificationIntervalId: number | null = null;

async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.warn('This browser does not support desktop notification');
        appState.notificationPermission = 'denied'; // Treat as denied if not supported
        saveState();
        renderApp(); // Re-render to show status (e.g., on dashboard)
        return;
    }

    if (Notification.permission === 'granted') {
        appState.notificationPermission = 'granted';
        initializeNotificationChecks();
        saveState();
        renderApp();
        return;
    }

    if (Notification.permission === 'denied') {
        appState.notificationPermission = 'denied';
        saveState();
        renderApp();
        return;
    }

    // Default or not yet requested
    try {
        const permission = await Notification.requestPermission();
        appState.notificationPermission = permission;
        if (permission === 'granted') {
            initializeNotificationChecks();
        }
        saveState();
        renderApp(); // Re-render to update UI with new permission status
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        appState.notificationPermission = 'denied'; // Assume denied on error
        saveState();
        renderApp();
    }
}

function initializeNotificationChecks() {
    if (appState.notificationPermission === 'granted') {
        if (notificationIntervalId) {
            clearInterval(notificationIntervalId);
        }
        notificationIntervalId = window.setInterval(checkAndSendNotifications, NOTIFICATION_CHECK_INTERVAL);
        console.log("Notification checks initialized.");
        checkAndSendNotifications(); // Run once immediately
    } else {
        if (notificationIntervalId) {
            clearInterval(notificationIntervalId);
            notificationIntervalId = null;
            console.log("Notification checks stopped due to lack of permission.");
        }
    }
}

function checkAndSendNotifications() {
    if (appState.notificationPermission !== 'granted' || !appState.currentUser) {
        return;
    }

    const now = new Date();
    const todayISO = now.toISOString().split('T')[0];
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

    // Check Medications
    appState.medications.forEach(med => {
        if (med.taken) return;

        const [hours, minutes] = med.time.split(':').map(Number);
        const medTimeMinutes = hours * 60 + minutes;

        // Notify if current time is at or slightly past medication time (e.g., within a 5-minute window)
        if (currentTimeMinutes >= medTimeMinutes && currentTimeMinutes < medTimeMinutes + 5) {
            const notificationKey = `med-${med.id}-${todayISO}-${med.time}`;
            const lastSentTimestamp = appState.lastNotificationTimestamps[notificationKey];

            // Only send if not notified today for this specific time, or if last notification was long ago (e.g., >1hr, for recurring checks)
            // For simplicity, we'll just check if it was sent for this key at all.
            // A more robust system would check if lastSentTimestamp is older than, say, 1 hour.
            if (!lastSentTimestamp || (Date.now() - lastSentTimestamp > 3600000) ) { // Allow re-notify after 1 hour if still not taken
                const assignedToMember = appState.familyMembers.find(fm => fm.id === med.assignedTo);
                const memberName = assignedToMember ? assignedToMember.name : t('self');
                const title = t('medicationReminderTitle');
                const body = t('medicationReminderBody').replace('%s', `${med.name} (${med.dosage}) for ${memberName}`);

                new Notification(title, { body, icon: './assets/medminder_icon.png' }); // Assuming an icon exists
                appState.lastNotificationTimestamps[notificationKey] = Date.now();
                console.log(`Notification sent for medication: ${med.name}`);
            }
        }
    });

    // Check Appointments (notify 30 mins before)
    appState.appointments.forEach(appt => {
        if (appt.completed) return;

        const apptDateTime = new Date(`${appt.date}T${appt.time}`);
        const timeDiffMinutes = (apptDateTime.getTime() - now.getTime()) / (1000 * 60);

        if (timeDiffMinutes > 0 && timeDiffMinutes <= 30) { // Notify if appointment is within the next 30 minutes
            const notificationKey = `appt-${appt.id}`;
            const lastSentTimestamp = appState.lastNotificationTimestamps[notificationKey];

            if (!lastSentTimestamp) {
                const assignedToMember = appState.familyMembers.find(fm => fm.id === appt.assignedTo);
                const memberName = assignedToMember ? assignedToMember.name : t('self');
                const title = t('appointmentReminderTitle');
                const body = t('appointmentReminderBody')
                                .replace('%s', appt.title)
                                .replace('%s', `${appt.time} for ${memberName}`); // Second %s for time and assignee

                new Notification(title, { body, icon: './assets/medminder_icon.png' });
                appState.lastNotificationTimestamps[notificationKey] = Date.now();
                console.log(`Notification sent for appointment: ${appt.title}`);
            }
        }
    });

    saveState(); // Save updated lastNotificationTimestamps
}


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
      window.location.href = 'login.html';
      return;
  }
  // appState is already initialized via loadInitialState at the top.

  const enterAppButton = document.getElementById('enter-app-button');
  if (enterAppButton) {
    enterAppButton.addEventListener('click', showMainApp);
  }

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
  }

  const nav = document.getElementById('app-nav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' && target.dataset.view) {
        const newView = target.dataset.view;
        if (appState.currentView !== newView ||
            appState.editingMedicationId || appState.editingAppointmentId || appState.editingFamilyMemberId) {
            appState.currentView = newView;
            appState.editingMedicationId = null;
            appState.editingAppointmentId = null;
            appState.editingFamilyMemberId = null;
            saveState(); // Save change of view and clearing of edit states
            renderApp();
        }
      }
    });
  }

  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.addEventListener('change', (e) => {
      appState.language = (e.target as HTMLSelectElement).value as 'en' | 'es';
      saveState();
      renderApp();
    });
  }

  // Initial call to set up notification permission state and potentially start checks
  if (!appState.isLandingActive) { // If not on landing, user has already "entered app"
      requestNotificationPermission();
  }
  // If landing page is active, requestNotificationPermission will be called by showMainApp()

  renderApp();
});

export {}; // Treat this file as a module
