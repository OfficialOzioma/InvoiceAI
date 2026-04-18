import { Request, Response } from 'express';
import { adminDb } from '../lib/firebaseAdmin.js';

export const getDashboard = async (req: Request, res: Response) => {
  // Mocking auth check for now, in a real app would use a middleware
  const user = (req as any).user;
  
  if (!user) {
    return res.redirect('/login');
  }

  try {
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    const activeWorkspaceId = userData?.activeWorkspace;
    
    let invoices: any[] = [];
    if (activeWorkspaceId) {
       const invSnap = await adminDb.collection('workspaces')
        .doc(activeWorkspaceId)
        .collection('invoices')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();
        
       invoices = invSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    res.render('pages/dashboard', {
      title: 'Dashboard | InvoiceAI',
      layout: 'dashboard-layout',
      user,
      invoices,
      activeWorkspace: activeWorkspaceId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
};
