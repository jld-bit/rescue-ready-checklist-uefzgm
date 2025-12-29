
type ChecklistEventListener = () => void;

class ChecklistEventEmitter {
  private listeners: ChecklistEventListener[] = [];

  subscribe(listener: ChecklistEventListener): () => void {
    this.listeners.push(listener);
    console.log('Subscribed to checklist events. Total listeners:', this.listeners.length);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
      console.log('Unsubscribed from checklist events. Total listeners:', this.listeners.length);
    };
  }

  emit() {
    console.log('Emitting checklist reset event to', this.listeners.length, 'listeners');
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('Error in checklist event listener:', error);
      }
    });
  }
}

export const checklistEvents = new ChecklistEventEmitter();
