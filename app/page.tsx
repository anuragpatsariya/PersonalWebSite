"use client";

import styles from "./page.module.css";
import React, { useState, useRef, useCallback } from "react";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Constrain to viewport with more reasonable bounds
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 300;
    
    setPosition({
      x: Math.max(-200, Math.min(maxX, newX)),
      y: Math.max(-50, Math.min(maxY, newY))
    });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  return (
    <div className={styles.desktop}>
      {/* Hell Background */}
      <div className={styles.hellBackground}></div>
      
      {/* Desktop Icons/Folders */}
      <div className={styles.desktopIcons}>
        <div className={styles.desktopFolder}>
          <div className={styles.folderIcon}>📁</div>
          <span className={styles.folderLabel}>Tools</span>
        </div>
        
        <div className={styles.desktopFolder}>
          <div className={styles.folderIcon}>📂</div>
          <span className={styles.folderLabel}>Projects</span>
        </div>
        
        <div className={styles.desktopFolder}>
          <div className={styles.folderIcon}>🎮</div>
          <span className={styles.folderLabel}>Games</span>
        </div>
        
        <div className={styles.desktopFolder + ' ' + styles.portalFolder}>
          <div className={styles.folderIcon}>💀</div>
          <span className={styles.folderLabel}>Hell Portal</span>
          <div className={styles.wormhole}>
            <div className={styles.wormholeRing}></div>
            <div className={styles.wormholeRing}></div>
            <div className={styles.wormholeRing}></div>
            <div className={styles.wormholeRing}></div>
            <div className={styles.wormholeRing}></div>
          </div>
        </div>
        
        <div className={styles.desktopFile}>
          <div className={styles.fileIcon}>📄</div>
          <span className={styles.fileLabel}>Resume.doc</span>
        </div>
        
        <div className={styles.desktopFile}>
          <div className={styles.fileIcon}>📧</div>
          <span className={styles.fileLabel}>Contact.exe</span>
        </div>
      </div>
      
      {/* Main Window with Perspective and Draggable */}
      <div 
        ref={windowRef}
        className={styles.window + ' ' + styles.perspectiveWindow + (isDragging ? ' ' + styles.dragging : '')}
        style={{
          left: `calc(15% + ${position.x}px)`,
          top: `calc(8% + ${position.y}px)`,
          transition: isDragging ? 'none' : 'all 0.3s ease'
        }}
      >
        <div 
          className={styles.titleBar + ' ' + styles.draggableTitle}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.titleBarLeft}>
            <div className={styles.windowIcon}>💀</div>
            <span className={styles.windowTitle + ' ' + styles.glitchText} data-text="DOOM_SLAYER_ANURAG.exe - Hell on Mars">DOOM_SLAYER_ANURAG.exe - Hell on Mars</span>
          </div>
          <div className={styles.windowControls} onMouseDown={(e) => e.stopPropagation()}>
            <button className={styles.minimizeBtn}>_</button>
            <button className={styles.maximizeBtn}>□</button>
            <button className={styles.closeBtn}>×</button>
          </div>
        </div>
        
        <div className={styles.windowContent}>
          <div className={styles.doomTerminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.doomLogo}>
                <span className={styles.doomText + ' ' + styles.glitchText} data-text="D O O M">D O O M</span>
                <div className={styles.fireEffect}></div>
              </div>
            </div>
            
            <div className={styles.slayerProfile}>
              <div className={styles.profileSection}>
                <h2 className={styles.slayerTitle}>THE DOOM SLAYER</h2>
                <div className={styles.slayerInfo}>
                  <div className={styles.infoCard}>
                    <h3 className={styles.cardTitle}>[IDENTITY]</h3>
                    <p className={styles.doomName}>Anurag Patsariya</p>
                    <p className={styles.subtitle}>Hell Walker • Doom Slayer</p>
                  </div>
                  
                  <div className={styles.infoCard}>
                    <h3 className={styles.cardTitle}>[STATUS]</h3>
                    <p className={styles.statusActive}>🔥 RIP & TEAR</p>
                    <p>Demons eliminated: ∞</p>
                  </div>
                  
                  <div className={styles.infoCard}>
                    <h3 className={styles.cardTitle}>[LOCATION]</h3>
                    <p>Mars UAC Facility</p>
                    <p className={styles.coords}>Hell Dimension Portal</p>
                  </div>
                </div>
              </div>
              
              {/* Weapon Arsenal */}
              <div className={styles.weaponArsenal}>
                <h3 className={styles.arsenalTitle}>WEAPON ARSENAL</h3>
                <div className={styles.weaponGrid}>
                  <div className={styles.weapon}>
                    <span className={styles.weaponIcon}>🔫</span>
                    <span className={styles.weaponName}>Super Shotgun</span>
                  </div>
                  <div className={styles.weapon}>
                    <span className={styles.weaponIcon}>⚡</span>
                    <span className={styles.weaponName}>BFG-9000</span>
                  </div>
                  <div className={styles.weapon}>
                    <span className={styles.weaponIcon}>🚀</span>
                    <span className={styles.weaponName}>Rocket Launcher</span>
                  </div>
                  <div className={styles.weapon}>
                    <span className={styles.weaponIcon}>⛏️</span>
                    <span className={styles.weaponName}>Chainsaw</span>
                  </div>
                </div>
              </div>
              
              {/* Hell Console */}
              <div className={styles.hellConsole}>
                <div className={styles.consoleTitle}>HELL TERMINAL ACCESS</div>
                <div className={styles.consoleOutput}>
                  <div className={styles.consoleLine}>
                    <span className={styles.prompt}>DOOM&gt;</span>
                    <span className={styles.command}>Initiating demon purge protocol...</span>
                  </div>
                  <div className={styles.consoleLine}>
                    <span className={styles.prompt}>DOOM&gt;</span>
                    <span className={styles.command}>Loading Super Shotgun... READY</span>
                  </div>
                  <div className={styles.consoleLine}>
                    <span className={styles.prompt}>DOOM&gt;</span>
                    <span className={styles.command}>Hell energy detected: MAXIMUM</span>
                  </div>
                  <div className={styles.consoleLine}>
                    <span className={styles.prompt}>DOOM&gt;</span>
                    <span className={styles.commandActive}>RIP_AND_TEAR.exe EXECUTING...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* XP Taskbar */}
      <div className={styles.taskbar}>
        <button className={styles.startButton}>
          <div className={styles.startIcon}>⊞</div>
          <span className={styles.startText}>start</span>
        </button>
        
        <div className={styles.taskbarItems}>
          <div className={styles.taskbarApp}>
            <div className={styles.appIcon}>💀</div>
            <span>DOOM_SLAYER_ANURAG.exe</span>
          </div>
        </div>
        
        <div className={styles.systemTray}>
          <div className={styles.trayIcon}>🔊</div>
          <div className={styles.trayIcon}>🌐</div>
          <div className={styles.trayIcon}>🔥</div>
          <div className={styles.clock}>
            <div>3:33 AM</div>
            <div>06/06/2024</div>
          </div>
        </div>
      </div>
      
      {/* Doom Demons Flying Around with Particle Trails */}
      <div className={styles.demonContainer}>
        <div className={styles.demon + ' ' + styles.demon1}>
          <span className={styles.demonSprite}>👹</span>
          <div className={styles.particleTrail}>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
          </div>
          <div className={styles.hellFire}></div>
        </div>
        <div className={styles.demon + ' ' + styles.demon2}>
          <span className={styles.demonSprite}>😈</span>
          <div className={styles.particleTrail}>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
          </div>
          <div className={styles.hellFire}></div>
        </div>
        <div className={styles.demon + ' ' + styles.demon3}>
          <span className={styles.demonSprite}>💀</span>
          <div className={styles.particleTrail}>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
            <div className={styles.trailParticle}></div>
          </div>
          <div className={styles.hellFire}></div>
        </div>
      </div>
      
      {/* Hell Particles */}
      <div className={styles.hellParticles}>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className={styles.hellParticle}></div>
        ))}
      </div>
    </div>
  );
}