enum EventName {
    ALL = 'all',

    /** Character events */
    ACHIEVEMENT_EARNED = 'AchievementEarned',
    BATTLERANK_UP = 'BattleRankUp',
    DEATH = 'Death',
    GAIN_EXPERIENCE = 'GainExperience',
    ITEM_ADDED = 'ItemAdded',
    PLAYER_FACILITY_CAPTURE = 'PlayerFacilityCapture',
    PLAYER_FACILITY_DEFEND = 'PlayerFacilityDefend',
    PLAYER_LOGIN = 'PlayerLogin',
    PLAYER_LOGOUT = 'PlayerLogout',
    SKILL_ADDED = 'SkillAdded',
    VEHICLE_DESTROY = 'VehicleDestroy',

    /** World events*/
    FACILITY_CONTROL = 'FacilityControl',
    METAGAME_EVENT = 'MetagameEvent',
    CONTINENT_LOCK = 'ContinentLock',
    CONTINENT_UNLOCK = 'ContinentUnlock'

}

export default EventName;
