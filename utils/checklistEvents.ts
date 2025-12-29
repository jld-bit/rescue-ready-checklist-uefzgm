
type ChecklistEventListener = (category?: string) => void;

class ChecklistEventEmitter {
  private listeners: Map<string, ChecklistEventListener[]> = new Map();

  subscribe(category: string, listener: ChecklistEventListener): () => void {
    if (!this.listeners.has(category)) {
      this.listeners.set(category, []);
    }
    
    const categoryListeners = this.listeners.get(category)!;
    categoryListeners.push(listener);
    console.log(`Subscribed to ${category} events. Total listeners for ${category}:`, categoryListeners.length);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(category);
      if (listeners) {
        const filtered = listeners.filter(l => l !== listener);
        this.listeners.set(category, filtered);
        console.log(`Unsubscribed from ${category} events. Total listeners for ${category}:`, filtered.length);
      }
    };
  }

  emit(category: string) {
    const listeners = this.listeners.get(category);
    if (listeners) {
      console.log(`Emitting reset event for ${category} to ${listeners.length} listeners`);
      listeners.forEach(listener => {
        try {
          listener(category);
        } catch (error) {
          console.error(`Error in ${category} event listener:`, error);
        }
      });
    } else {
      console.log(`No listeners registered for ${category}`);
    }
  }

  emitAll() {
    console.log('Emitting reset event to all categories');
    const allCategories = Array.from(this.listeners.keys());
    allCategories.forEach(category => {
      this.emit(category);
    });
  }
}

export const checklistEvents = new ChecklistEventEmitter();
