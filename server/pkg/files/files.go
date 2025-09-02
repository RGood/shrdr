package files

import "github.com/RGood/shrdr/common/pkg/generated/filesystem"

type FSEntry interface {
	GetName() string
	GetChildren() map[string]FSEntry
	cmp(FSEntry) bool
}

type Directory struct {
	name     string
	children map[string]FSEntry
}

func (d *Directory) GetName() string {
	return d.name + "/"
}

func (d *Directory) GetChildren() map[string]FSEntry {
	return d.children
}

func (d *Directory) cmp(other FSEntry) bool {
	switch e := other.(type) {
	case *Directory:
		return d.name < e.name
	default:
		return true
	}
}

type File struct {
	name string
}

func (f *File) GetName() string {
	return f.name
}

func (f *File) GetChildren() map[string]FSEntry {
	return nil
}

func (f *File) cmp(other FSEntry) bool {
	switch e := other.(type) {
	case *File:
		return f.name < e.name
	default:
		return false
	}
}

func ManifestFromProto(entries []*filesystem.FSEntry) map[string]FSEntry {
	root := make(map[string]FSEntry)
	for _, entry := range entries {
		switch e := entry.GetRecord().(type) {
		case *filesystem.FSEntry_File:
			root[e.File.GetName()] = &File{name: e.File.GetName()}
		case *filesystem.FSEntry_Folder:
			root[e.Folder.GetName()] = &Directory{name: e.Folder.GetName(), children: ManifestFromProto(e.Folder.GetContents())}
		}
	}
	return root
}
