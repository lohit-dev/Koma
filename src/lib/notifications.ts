const CHANNEL = "reminders";

type NotificationsModule = typeof import("expo-notifications");

let notificationsModule: Promise<NotificationsModule | null> | undefined;

/**
 * Expo Go on Android does not include every expo-notifications native module.
 * Load notifications only when they are needed so routes can still render.
 */
function getNotifications() {
  notificationsModule ??= import("expo-notifications").catch(() => null);
  return notificationsModule;
}

/** Asks permission and (re)schedules the daily reminder. Returns false if permission is denied. */
export async function scheduleReminders({
  hour,
  minute,
  saver,
}: {
  hour: number;
  minute: number;
  saver: boolean;
}) {
  const Notifications = await getNotifications();
  if (!Notifications) return false;

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return false;

    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: "Daily reminder",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
    await Notifications.cancelAllScheduledNotificationsAsync();

    const daily = (h: number, title: string, body: string) =>
      Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: h % 24,
          minute,
          channelId: CHANNEL,
        },
      });

    await daily(
      hour,
      "Your strip is waiting",
      "Three minutes keeps your streak alive.",
    );
    if (saver)
      await daily(
        hour + 1,
        "Streak at risk",
        "One quick strip saves it before midnight.",
      );
    return true;
  } catch {
    return false;
  }
}

export async function cancelReminders() {
  const Notifications = await getNotifications();
  if (!Notifications) return;

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // Notifications are optional in Expo Go and unavailable until a dev build is installed.
  }
}
